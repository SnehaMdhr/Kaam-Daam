import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentReviews = ({ studentId }) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reviews/${studentId}`)
      .then((res) => {
        const data = res.data;
        setAverageRating(parseFloat(data.averageRating || 0));
      })
      .catch((err) => {
        console.error("Error fetching reviews", err);
      });
  }, [studentId]);

  return (
    <div className="rating-summary">
      <h3>⭐ Reviews & Ratings</h3>
      <div>
  {[1, 2, 3, 4, 5].map((i) => (
    <span key={i} style={{ color: i <= averageRating ? "#f4b400" : "#ccc", fontSize: "24px" }}>
      ★
    </span>
  ))}
  <span style={{ marginLeft: "10px" }}>{averageRating.toFixed(1)} / 5</span>
</div>

    </div>
  );
};

export default StudentReviews;
