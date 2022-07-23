/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import { StatusCodes } from 'http-status-codes';
import User from '../models/user.js';
import CustomApiErrorHandler from '../utils/CustomApiErrorHandler.js';

export const register = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    throw new CustomApiErrorHandler(
      'Please provide all the values!!',
      StatusCodes.BAD_REQUEST
    );
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new CustomApiErrorHandler(
      'User with this email already exists',
      StatusCodes.BAD_REQUEST
    );
  }
  const user = await User.create({ email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
    },
    token,
  });
};
