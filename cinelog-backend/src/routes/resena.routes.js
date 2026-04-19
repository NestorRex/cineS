import { Router } from 'express';
import { listarResenas, nuevaResena, eliminarResena } from '../controllers/resena.controller.js';

const router = Router();

router.get('/:idPelicula', listarResenas);   // GET /api/resenas/:idPelicula
router.post('/', nuevaResena);               // POST /api/resenas
router.delete('/:id', eliminarResena);       // DELETE /api/resenas/:id

export default router;