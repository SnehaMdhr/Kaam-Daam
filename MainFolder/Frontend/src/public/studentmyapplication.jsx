import React from 'react'
import Header  from '../components/headerforemployer'
import Sidebar from '../components/sidebarstudent'
import "./studentmyapplication.css"

const studentmyapplication = () => {
  return (
    <div>
        <Header/>
        <div className="applications-container">
          <Sidebar/>
      <h2>My Applications</h2>

      {/* Application 1 */}
      <div className="application-card">
        <div className="app-info">
          <span className="app-status applied">Applied</span>
          <h3 className="job-title">Junior Software Developer</h3>
          <p className="company">Tech Innovators Inc. | Kathmandu</p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
          alt="Job visual"
        />
      </div>

      {/* Application 2 */}
      <div className="application-card">
        <div className="app-info">
          <span className="app-status review">Under Review</span>
          <h3 className="job-title">IT Support Specialist</h3>
          <p className="company">Global Solutions Ltd. | Lalitpur</p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/5696/5696551.png"
          alt="Job visual"
        />
      </div>

      {/* Application 3 */}
      <div className="application-card">
        <div className="app-info">
          <span className="app-status rejected">Rejected</span>
          <h3 className="job-title">Web Development Intern</h3>
          <p className="company">Creative Minds Studio | Bhaktapur</p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/7497/7497650.png"
          alt="Job visual"
        />
      </div>

      {/* Application 4 */}
      <div className="application-card">
        <div className="app-info">
          <span className="app-status accepted">Accepted</span>
          <h3 className="job-title">Data Entry Clerk</h3>
          <p className="company">Data Dynamics Co. | Kathmandu</p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3815/3815145.png"
          alt="Job visual"
        />
      </div>

      <div className="view-more">+ view more</div>
    </div>
    </div>
  )
}

export default studentmyapplication
