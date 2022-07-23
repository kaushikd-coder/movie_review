/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import { deleteMovie } from '../app/features/moviesSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

export default function Movies() {
  const [movies, setMovies] = useState([]);

  const dispatch = useDispatch();

  const movieDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const fetchMoviesData = async () => {
    try {
      const { data } = await axios('/movies', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMoviesData();
  }, [fetchMoviesData]);

  //   if (isLoading) {
  //     return (
  //       <div className="flex items-center justify-center ">
  //         <div className="w-32 h-32 border-b-2 border-gray-900 rounded-full animate-spin"></div>
  //       </div>
  //     );
  //   }

  return (
    <>
      {movies?.movies?.length === 0 || !user ? (
        <div className="sm:w-full lg:w-[75%] flex items-center  m-auto mt-7  justify-evenly">
          <h1 className="text-2xl font-bold ">No Shows to display..</h1>
          <p></p>
          <p></p>
          <p></p>
          <Link to="/add" className="mt-6 text-xl text-green-600">
            Add
          </Link>
        </div>
      ) : (
        <>
          <div className="sm:w-full lg:w-[75%] flex items-center  m-auto mt-7  justify-evenly">
            <h1 className="text-2xl font-bold ">TV Shows List:</h1>
            <p></p>
            <p></p>
            <p></p>
            <Link to="/add" className="mt-6 text-xl text-green-600">
              Add
            </Link>
          </div>
          <div className=" sm:w-full lg:w-[75%] flex items-center  m-auto mt-3   justify-evenly">
            <p className="font-bold">Title</p>
            <p className="font-bold">Streaming App</p>
            <p></p>
            <p></p>
            <p></p>
          </div>

          {movies?.movies?.map((movie) => (
            <div
              className="sm:w-full lg:w-[75%] flex items-center  m-auto mt-2 shadow  justify-evenly "
              key={movie._id}
            >
              <h1 className="mt-2 text-sm r">{movie.title}</h1>

              <h3 className="mt-2 text-sm ">{movie.streamingApp}</h3>

              <Link
                to={`/update/${movie._id}`}
                className="mt-2 text-xl text-green-600"
              >
                Edit
              </Link>
              <button onClick={() => movieDelete(movie._id)}>
                <AiFillDelete
                  size={20}
                  color="red"
                  className="mt-2 hover:cursor-pointer"
                />
              </button>
              <Link
                to={`/details/${movie._id}`}
                className="mt-2 text-xl text-green-600"
              >
                Details
              </Link>
            </div>
          ))}
        </>
      )}
    </>
  );
}
