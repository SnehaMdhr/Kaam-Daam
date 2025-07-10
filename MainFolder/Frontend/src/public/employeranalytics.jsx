import React from 'react'
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';
import "./employeranalytics.css"
import graph from "../assets/image/graph.png";


const employeranalytics = () => {
  return (
    <div>
        <HeaderForEmployer />
        
      <div className="dashboard-container">
        <Sidebar />
      <h1>Analytics</h1>
      <h2> Key Performance Indicators</h2>

      {/* KPI Cards */}
      <div className="kpi-section">
        
        <div className="kpi-card">
          <h4>Total Job Postings</h4>
          <p>25</p>
        </div>
        <div className="kpi-card">
          <h4>Active Job Postings</h4>
          <p>15</p>
        </div>
        <div className="kpi-card">
          <h4>Total Applications Received</h4>
          <p>350</p>
        </div>
        <div className="kpi-card">
          <h4>Average Applications Per Posting</h4>
          <p>14</p>
        </div>
      </div>

      {/* Application Trend */}
      <div className="trend-section">
        <h2>Application Trends Over Time</h2>
        <img src={graph} alt="graph" />
      </div>

      {/* Job Posting Performance Table */}
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
          <tr>
            <td>Software Engineer</td>
            <td>1200</td>
            <td>150</td>
            <td>85</td>
            <td>Shortlisted: 30, Interviewed: 10</td>
          </tr>
          <tr>
            <td>Data Analyst</td>
            <td>800</td>
            <td>100</td>
            <td>78</td>
            <td>Shortlisted: 20, Interviewed: 8</td>
          </tr>
          <tr>
            <td>UX/UI Designer</td>
            <td>600</td>
            <td>80</td>
            <td>92</td>
            <td>Shortlisted: 15, Interviewed: 5</td>
          </tr>
          <tr>
            <td>Project Manager</td>
            <td>500</td>
            <td>50</td>
            <td>80</td>
            <td>Shortlisted: 10, Interviewed: 4</td>
          </tr>
          <tr>
            <td>Marketing Specialist</td>
            <td>400</td>
            <td>20</td>
            <td>70</td>
            <td>Shortlisted: 5, Interviewed: 2</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default employeranalytics
