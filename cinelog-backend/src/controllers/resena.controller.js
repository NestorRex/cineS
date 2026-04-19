import * as ResenaModel from '../models/resena.model.js';

export const listarResenas = async (req, res) => {
  try {
    const resenas = await ResenaModel.getResenasByPelicula(req.params.idPelicula);
    res.json({ ok: true, data: resenas });
  } catch (e) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener reseñas' });
  }
};

export const nuevaResena = async (req, res) => {
  try {
    const { autor, comentario, calificacion, id_pelicula } = req.body;
    if (!autor || !comentario || !calificacion || !id_pelicula) {
      return res.status(400).json({ ok: false, mensaje: 'Todos los campos son requeridos' });
    }
    const id = await ResenaModel.createResena(req.body);
    res.status(201).json({ ok: true, mensaje: 'Reseña publicada', id });
  } catch (e) {
    res.status(500).json({ ok: false, mensaje: 'Error al publicar reseña' });
  }
};

export const eliminarResena = async (req, res) => {
  try {
    const filas = await ResenaModel.deleteResena(req.params.id);
    if (filas === 0) return res.status(404).json({ ok: false, mensaje: 'Reseña no encontrada' });
    res.json({ ok: true, mensaje: 'Reseña eliminada' });
  } catch (e) {
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar reseña' });
  }
};