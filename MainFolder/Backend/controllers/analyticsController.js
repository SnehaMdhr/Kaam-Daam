const pool = require("../db");

// GET KPI Data
const getKPI = async (req, res) => {
  const { employerId } = req.params;

  try {
    const totalJobs = await pool.query(
      "SELECT COUNT(*) FROM job_posts WHERE user_id = $1",
      [employerId]
    );

    const activeJobs = await pool.query(
      "SELECT COUNT(*) FROM job_posts WHERE user_id = $1 AND status = 'open'",
      [employerId]
    );

    const totalApplications = await pool.query(
      `SELECT COUNT(*) FROM job_applications WHERE job_id IN (
        SELECT id FROM job_posts WHERE user_id = $1
      )`,
      [employerId]
    );

    const avgApplications = await pool.query(
      `SELECT AVG(app_count) FROM (
         SELECT COUNT(*) as app_count FROM job_applications 
         WHERE job_id IN (SELECT id FROM job_posts WHERE user_id = $1)
         GROUP BY job_id
       ) sub`,
      [employerId]
    );

    res.json({
      totalJobs: totalJobs.rows[0]?.count || "0",
      activeJobs: activeJobs.rows[0]?.count || "0",
      totalApplications: totalApplications.rows[0]?.count || "0",
      avgApplications: parseFloat(avgApplications.rows[0]?.avg || 0).toFixed(1),
    });
  } catch (error) {
    console.error("KPI Error:", error);
    res.status(500).send("Server error");
  }
};

// GET Application Trends (fake monthly data)
const getTrends = async (req, res) => {
  const { employerId } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', ja.applied_at), 'Mon') AS month,
        COUNT(*) AS applications
      FROM job_applications ja
      JOIN job_posts jp ON ja.job_id = jp.id
      WHERE jp.user_id = $1
      GROUP BY DATE_TRUNC('month', ja.applied_at)
      ORDER BY DATE_TRUNC('month', ja.applied_at)
    `, [employerId]);

    res.json(result.rows);
  } catch (error) {
    console.error("Trend Error:", error);
    res.status(500).send("Server error");
  }
};

const getPerformance = async (req, res) => {
  const { employerId } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        jp.title AS job_title,
        jp.views,
        COUNT(ja.id) AS applications,
        ROUND(RANDOM() * 20 + 70) AS quality_score,
        ROUND(RANDOM() * 10) AS shortlisted,
        ROUND(RANDOM() * 5) AS interviewed
      FROM job_posts jp
      LEFT JOIN job_applications ja ON jp.id = ja.job_id
      WHERE jp.user_id = $1
      GROUP BY jp.id
    `, [employerId]);

    const data = result.rows.map(row => ({
      jobTitle: row.job_title,
      views: row.views,
      applications: row.applications,
      qualityScore: row.quality_score,
      actions: `Shortlisted: ${row.shortlisted}, Interviewed: ${row.interviewed}`,
    }));

    res.json(data);
  } catch (error) {
    console.error("Performance Error:", error);
    res.status(500).send("Server error");
  }
};



module.exports = {
  getKPI,
  getTrends,
  getPerformance,
  
};