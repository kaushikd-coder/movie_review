import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createMovie } from '../app/features/moviesSlice';

export default function AddMovie() {
  const [title, setTitle] = useState('');
  const [streamingApp, setStreamingApp] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, streamingApp };
    dispatch(createMovie(data));
    navigate('/movies');
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-center h-screen"
        onSubmit={handleSubmit}
      >
        <h1 className="text-lg font-bold text-center ">Add Show</h1>
        <input
          className="px-3 py-2 mt-4 leading-tight text-gray-700 border rounded shadow appearance-none sm:w-60 md:w-72 lg:w-96 focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter App"
          value={streamingApp}
          onChange={(e) => setStreamingApp(e.target.value)}
          className="px-3 py-2 mt-4 leading-tight text-gray-700 border rounded shadow appearance-none sm:w-60 md:w-72 lg:w-96 focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="py-2 mt-4 font-bold text-center text-indigo-400 bg-gray-900 border-2 border-indigo-400 rounded w-[13rem] sm:w-60 md:w-72 lg:w-96 focus:outline-none"
        >
          Add
        </button>
      </form>
    </>
  );
}
