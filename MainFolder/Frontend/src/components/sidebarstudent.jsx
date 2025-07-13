import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const SidebarStudent = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("userId");

  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="/studentdashboard">Dashboard</a>
        </li>
        <li>
          <a href="/studentjobs">Jobs</a>
        </li>
        <li>
          <a href={`/studentreview/${studentId}`}>Review</a>
        </li>
        <li>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/student/messages")}
          >
            Messaging
          </span>
        </li>
        <li>
          <a href="/studentprofileedit">Profile</a>
        </li>
        <li>
          <a href="/studentmyapplication">My Applications</a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarStudent;
