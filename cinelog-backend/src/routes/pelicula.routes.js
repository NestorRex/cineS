import { Router } from 'express';
import { listarPeliculas, obtenerPelicula, nuevaPelicula, listarGeneros } from '../controllers/pelicula.controller.js';

const router = Router();

router.get('/', listarPeliculas);           // GET /api/peliculas
router.get('/generos', listarGeneros);       // GET /api/peliculas/generos
router.get('/:id', obtenerPelicula);         // GET /api/peliculas/:id
router.post('/', nuevaPelicula);             // POST /api/peliculas

export default router;