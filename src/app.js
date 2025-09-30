import express from 'express';
import cors from 'cors';
import coursesRouter from './routes/courses.routes.js';

const app = express()

app.use(cors());
app.use(express.json());
app.use('/api', coursesRouter);

export default app;