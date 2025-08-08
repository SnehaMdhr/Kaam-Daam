import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import "./studentreview.css"; // Optional for custom styles

const StudentReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const { userId: routeUserId } = useParams();

  useEffect(() => {
    let resolvedUserId = null;

    // Step 1: Get ID from route or localStorage
    if (routeUserId && routeUserId !== "null" && !isNaN(routeUserId)) {
      resolvedUserId = parseInt(routeUserId);
    } else {
      try {
        const userStr = localStorage.getItem("user");
        const userObj = userStr ? JSON.parse(userStr) : null;
        if (userObj && userObj.id && userObj.id !== "null") {
          resolvedUserId = userObj.id;
        }
      } catch (e) {
        console.error("Error parsing local user", e);
        setError("⚠️ Invalid user in localStorage.");
        return;
      }
    }

    // Step 2: Validate and fetch
    if (!resolvedUserId || isNaN(resolvedUserId)) {
      setError("❌ Invalid user ID. Cannot fetch reviews.");
      return;
    }

    axios
      .get(`http://localhost:5000/api/reviews/student/${resolvedUserId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => {
        console.error("❌ Error fetching reviews", err);
        setError("❌ Failed to load reviews.");
      });
  }, [routeUserId]);

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="reviews-container">
      <Header />
      <Sidebar />
      <div className="reviews-content">
        <h2 className="reviews-title">My Reviews</h2>
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews found.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="review-box">
              <strong className="employer-name">{r.employer_name}</strong> (
              <span className="rating">{r.rating}/5</span>)
              <p className="review-comment">{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentReviews;
