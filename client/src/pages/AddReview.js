import axios from 'axios';
import React, { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

export default function AddReview() {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  // get the user from the local Storage;
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { comment, rating };
      await axios.patch(`/movies/reviews/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate(`/details/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-center h-screen"
        onSubmit={handleSubmit}
      >
        {/* <h1 className="text-lg font-bold text-center ">Add Review</h1> */}
        <input
          className="px-3 py-2 mt-4 leading-tight text-gray-700 border rounded shadow appearance-none sm:w-60 md:w-72 lg:w-96 focus:outline-none focus:shadow-outline"
          type="number"
          placeholder="Enter Rating b/w 1 and 5"
          value={rating}
          required
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="px-3 py-2 mt-4 leading-tight text-gray-700 border rounded shadow appearance-none sm:w-60 md:w-72 lg:w-96 focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="py-2 mt-4 font-bold text-center text-indigo-400 bg-gray-900 border-2 border-indigo-400 rounded w-[13rem] sm:w-60 md:w-72 lg:w-96 focus:outline-none"
        >
          Submit Review
        </button>
      </form>
    </>
  );
}
