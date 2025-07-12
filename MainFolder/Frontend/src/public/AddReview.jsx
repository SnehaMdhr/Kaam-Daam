import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddReview = () => {
  const { studentId, jobId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/reviews',
        { studentId, jobId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review submitted!");
      navigate('/empoyerjobapplicationmanagement');
    } catch (err) {
      alert("Error: " + err.response?.data?.message);
    }
  };

  return (
    <div className="review-form">
      <h2>Give Review</h2>
      <label>Rating (1–5)</label>
      <input type="number" value={rating} min={1} max={5} onChange={e => setRating(e.target.value)} />
      <label>Comment</label>
      <textarea value={comment} onChange={e => setComment(e.target.value)} />
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

export default AddReview;