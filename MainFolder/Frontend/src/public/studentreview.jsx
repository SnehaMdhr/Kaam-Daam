import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>My Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        reviews.map((r) => (
          <div key={r.id}>
            <strong>{r.employer_name}</strong> ({r.rating}/5)
            <p>{r.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentReviews;
