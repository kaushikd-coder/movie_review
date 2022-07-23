/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import CustomApiErrorHandler from '../utils/CustomApiErrorHandler.js';

const authenticatedUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new CustomApiErrorHandler('Unauthorized', StatusCodes.UNAUTHORIZED);
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    throw new CustomApiErrorHandler('Unauthorized', StatusCodes.UNAUTHORIZED);
  }
};

export default authenticatedUser;
