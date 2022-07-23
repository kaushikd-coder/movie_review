import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from './Rating';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState('');
  const [loading, setLoading] = useState(true);
  const fetchSingleMovie = async (id) => {
    try {
      const { data } = await axios(`/movies/${id}`);
      setMovie(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const { id } = useParams();

  useEffect(() => {
    fetchSingleMovie(id);
  }, [id]);

  if (loading) return <h1>Loading</h1>;

  return (
    <>
      {movie?.movie?.reviews.length === 0 ? (
        <div className="flex items-center  m-auto mt-7  w-[70%] justify-evenly">
          <h1 className="text-2xl font-bold">No Reviews to display</h1>
          <Link
            to={`/reviews/add/${movie?.movie._id}`}
            className="mt-2 text-xl text-green-600"
          >
            Add Review
          </Link>
        </div>
      ) : (
        <>
          <div className="sm:w-full lg:w-[70%] flex items-center  m-auto mt-7   justify-evenly">
            <h1 className="text-2xl font-bold ">
              {movie?.movie?.title} Reviews
            </h1>

            <Link
              to={`/reviews/add/${movie?.movie._id}`}
              className="mt-2 text-xl text-green-600"
            >
              {movie?.movie?.reviews.length === 0 ? 'Add' : 'Update'} Review
            </Link>
          </div>

          <div className=" sm:w-full s lg:w-[70%] flex items-center m-auto mt-3 justify-evenly">
            <p className="font-bold">Rating</p>
            <p className="font-bold">Comment</p>
          </div>
          <div className="sm:w-full s lg:w-[70%] justify-evenly flex items-center  m-auto mt-3 shadow  ">
            <Rating value={movie?.movie?.reviews[0]?.rating} />

            <h1>{movie?.movie?.reviews[0]?.comment}</h1>
          </div>
        </>
      )}
    </>
  );
}
