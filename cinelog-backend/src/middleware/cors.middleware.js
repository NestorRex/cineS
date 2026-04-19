import cors from 'cors';

const corsMiddleware = cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
});

export default corsMiddleware;