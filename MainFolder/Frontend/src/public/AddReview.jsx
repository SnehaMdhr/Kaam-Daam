import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./addreview.css";
import Header from "../components/headerforemployer";
import Sidebar from "../components/sidebar";

const AddReview = () => {
  const { studentId, jobId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const rawUser = localStorage.getItem('user');
    const storedUser = rawUser ? JSON.parse(rawUser) : null;
    const token = storedUser?.token;

    try {
      await axios.post(
        'http://localhost:5000/api/reviews',
        { studentId, jobId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Review submitted!");
      setTimeout(() => navigate('/empoyerjobapplicationmanagement'), 2000);
    } catch (err) {
      toast.error("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <Header />
      <div className='review-form'>
        <div className="review">
          <Sidebar />
          <h1>Give Review</h1>
        </div>

        <div className="form-group">
          <label>Rating (1–5)</label>
          <input
            type="number"
            value={rating}
            min={1}
            max={5}
            onChange={e => setRating(e.target.value)}
          />

          <label>Comment</label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
          />

          <div className='button-wrapper'>
            <button onClick={handleSubmit}>Submit Review</button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AddReview;
