import { useNavigate } from "react-router-dom";
import "./sidebarforstudent.css";
import {
  FaHome,
  FaSuitcase,
  FaStar,
  FaEnvelope,
  FaBuilding,
  FaCog
} from 'react-icons/fa';
import { MdAssignmentTurnedIn } from 'react-icons/md'; // ✅ Fixed this line
const SidebarStudent = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("userId");

  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="/studentdashboard"><FaHome className="icon" />Dashboard</a>
        </li>
        <li>
          <a href="/studentjobs"><FaSuitcase className="icon" />Jobs</a>
        </li>
        <li>
          <a href={`/studentreview/${studentId}`}><FaStar className="icon" />Review</a>
        </li>
        <li>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/student/messages")}
          ><FaEnvelope className="icon" /> 
            Messaging
          </a>
        </li>
        <li>
          <a href="/studentprofile"><FaBuilding className="icon" />Profile</a>
        </li>
        <li>
          <a href="/studentmyapplication"><MdAssignmentTurnedIn className="icon" />My Applications</a>
        </li>
      </ul>
      <div className="sidebar-footer">
              <a href="/studentsetting"><FaCog className="icon" /> Settings</a>
            </div>
    </div>
  );
};

export default SidebarStudent;