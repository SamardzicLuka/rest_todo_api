import express from 'express';
import connectDB from './config/db.js';

const app = express();

connectDB();

// module.exports = app;  WROOONG!!!
export default app;
