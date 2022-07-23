/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import path from 'path';

import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/userRoutes.js';
import movieRoutes from './routes/movieRoutes.js';

dotenv.config();

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(errorHandler);

connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server is up and runnning on port ${port}`)
);
