import express from 'express';
import dotenv from 'dotenv';
import corsMiddleware from './src/middleware/cors.middleware.js';
import peliculaRoutes from './src/routes/pelicula.routes.js';
import resenaRoutes from './src/routes/resena.routes.js';

dotenv.config();
const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use('/api/peliculas', peliculaRoutes);
app.use('/api/resenas', resenaRoutes);

app.get('/', (req, res) => res.json({ mensaje: 'CineLog API corriendo ✅' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));