/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
import express from 'express';
import {
  createMovie,
  createMovieReview,
  deleteMovie,
  getAllMovies,
  getMovieReviews,
  getSingleMovie,
  updateMovie,
} from '../controllers/movieControllers.js';
import authenticatedUser from '../middlewares/auth.js';

const router = express.Router();

router.route('/create').post(authenticatedUser, createMovie);
router.route('/').get(authenticatedUser, getAllMovies);
router.route('/:id').get(getSingleMovie).patch(updateMovie).delete(deleteMovie);
router
  .route('/reviews/:id')
  .patch(authenticatedUser, createMovieReview)
  .get(getMovieReviews);

export default router;
