import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderForEmployer from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import "./employeranalytics.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Helper to compute dynamic Y-axis max
const getMaxYValue = (data) => {
  if (!data.length) return 10;
  const maxVal = Math.max(...data.map((d) => parseInt(d.applications)));
  if (maxVal === 0) return 5;
  const base = Math.pow(10, Math.floor(Math.log10(maxVal))); // nearest base (1, 10, 100 etc.)
  return Math.ceil((maxVal + 1) / base) * base;
};

const EmployerAnalytics = () => {
  const employerId = localStorage.getItem("userId");
  const [kpis, setKpis] = useState({});
  const [trendData, setTrendData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(
          `http://localhost:5000/api/analytics/kpi/${employerId}`
        );
        const res2 = await axios.get(
          `http://localhost:5000/api/analytics/trends/${employerId}`
        );
        const res3 = await axios.get(
          `http://localhost:5000/api/analytics/performance/${employerId}`
        );

        setKpis(res1.data);
        setTrendData(res2.data);
        setPerformanceData(res3.data);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
      }
    };

    fetchData();
  }, [employerId]);

  return (
    <div>
      <HeaderForEmployer />
      <div className="dashboard-container">
        <Sidebar />
        <h1>Analytics</h1>

        {/* KPIs */}
        <h2>Key Performance Indicators</h2>
        <div className="kpi-section">
          <div className="kpi-card">
            <h4>Total Job Postings</h4>
            <p>{kpis.totalJobs}</p>
          </div>
          <div className="kpi-card">
            <h4>Active Job Postings</h4>
            <p>{kpis.activeJobs}</p>
          </div>
          <div className="kpi-card">
            <h4>Total Applications</h4>
            <p>{kpis.totalApplications}</p>
          </div>
          <div className="kpi-card">
            <h4>Avg Applications Per Posting</h4>
            <p>{kpis.avgApplications}</p>
          </div>
        </div>

        {/* Trends Line Chart */}
        <div className="trend-section">
          <h2>Application Trends Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                domain={[0, getMaxYValue(trendData)]}
                allowDecimals={false}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Table */}
        <h4 className="section-title">Job Posting Performance</h4>
        <table className="performance-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Views</th>
              <th>Applications</th>
              <th>Quality Score</th>
              <th>Actions Taken</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((job, index) => (
              <tr key={index}>
                <td>{job.jobTitle}</td>
                <td>{job.views}</td>
                <td>{job.applications}</td>
                <td>{job.qualityScore}</td>
                <td>{job.actions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployerAnalytics;
