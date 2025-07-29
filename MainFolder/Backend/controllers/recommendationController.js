const fetch = require('node-fetch');

exports.getRecommendations = async (req, res) => {
  try {
    const { studentId } = req.params;
    const response = await fetch(`http://127.0.0.1:8000/recommend/${studentId}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Recommendation error:", err.message);
    res.status(500).json({ error: "Recommendation failed" });
  }
};

