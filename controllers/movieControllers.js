/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */

import { StatusCodes } from 'http-status-codes';
import Movie from '../models/movies.js';
import CustomApiErrorHandler from '../utils/CustomApiErrorHandler.js';

export const createMovie = async (req, res) => {
  // req.body.createdBy = req.user.id;

  console.log(req.user);

  const { title, streamingApp } = req.body;

  if (!title || !streamingApp) {
    throw new CustomApiErrorHandler(
      'Please provide all the values!!',
      StatusCodes.BAD_REQUEST
    );
  }

  const movie = await Movie.create({
    title,
    streamingApp,
    createdBy: req.user.id,
  });

  res.status(StatusCodes.CREATED).json({
    movie,
  });
};

// get alll Movies;

export const getAllMovies = async (req, res) => {
  const movies = await Movie.find({ createdBy: req.user.id });
  res.status(StatusCodes.OK).json({
    movies,
  });
};

//  get a single movie ==>  get request
export const getSingleMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    throw new CustomApiErrorHandler(
      'Movie not Found!!',
      StatusCodes.BAD_REQUEST
    );

  res.status(StatusCodes.OK).json({
    movie,
  });
};

// update a  review ==> patch request
export const updateMovie = async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  if (!movie)
    throw new CustomApiErrorHandler(
      'Movie not Found!!',
      StatusCodes.BAD_REQUEST
    );
  movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({
    success: true,
    movie,
  });
};

//  delete movie ==>  == delete request
export const deleteMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    throw new CustomApiErrorHandler(
      'Movie not Found!!',
      StatusCodes.BAD_REQUEST
    );
  movie.remove();
  res.status(200).json({
    success: true,
  });
};

// create a review

export const createMovieReview = async (req, res) => {
  const { rating, comment } = req.body;

  const review = {
    user: req.user.id,
    rating: Number(rating),
    comment,
  };

  const movie = await Movie.findById(req.params.id);

  const isReviewed = movie.reviews.find(
    (r) => r.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    movie.reviews.forEach((rev) => {
      console.log(rev);
      if (rev.user.toString() === req.user.id.toString()) {
        rev.comment = comment;
        rev.rating = rating;
      }
    });
  } else {
    movie.reviews.push(review);
  }

  await movie.save({ validateBeforeSave: false });

  res.status(StatusCodes.OK).json({
    success: true,
  });
};

//  get all the  Reviews of a movie ==>
export const getMovieReviews = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.status(StatusCodes.OK).json({ success: true, reviews: movie.reviews });
};
