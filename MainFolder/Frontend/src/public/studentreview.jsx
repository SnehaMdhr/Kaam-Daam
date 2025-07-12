import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/headerforstudent";  // You can also use a different header for employer if needed
import Sidebar from "../components/sidebarstudent";   // Optional: show sidebar if desired
import "./StudentViewProfile.css"; // Reuse CSS styles

const StudentReviewsPage = () => {
  const { studentId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [studentName, setStudentName] = useState("");

  // 🔄 Fetch student name (optional)
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${studentId}`)
      .then((res) => setStudentName(res.data.username))
      .catch((err) => console.error("Failed to load student name", err));
  }, [studentId]);

  // 🔄 Fetch reviews for this student
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reviews/student/${studentId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews", err));
  }, [studentId]);

  return (
    <div>
      <Header />
      <div className="profile-container">
        <Sidebar />
        <div className="profile-content">
          <h2>Reviews for {studentName}</h2>

          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="review-box" style={styles.reviewBox}>
                <strong>{r.employer_name}</strong> ({r.rating}/5)
                <p>{r.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  reviewBox: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9"
  }
};

export default StudentReviewsPage;