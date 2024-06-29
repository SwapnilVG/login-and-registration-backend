import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Allow requests from your frontend
  credentials: true // Allow credentials such as cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database Connected Successfully');
  })
  .catch((error) => {
    console.log('Failed To Connect Database', error);
  });

app.use('/api', userRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello from the server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
