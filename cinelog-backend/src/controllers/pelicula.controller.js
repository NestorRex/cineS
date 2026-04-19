import * as PeliculaModel from '../models/pelicula.model.js';

export const listarPeliculas = async (req, res) => {
  try {
    const peliculas = await PeliculaModel.getAllPeliculas();
    res.json({ ok: true, data: peliculas });
  } catch (e) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener películas', error: e.message });
  }
};

export const obtenerPelicula = async (req, res) => {
  try {
    const pelicula = await PeliculaModel.getPeliculaById(req.params.id);
    if (!pelicula) return res.status(404).json({ ok: false, mensaje: 'Película no encontrada' });
    res.json({ ok: true, data: pelicula });
  } catch (e) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener película', error: e.message });
  }
};

export const nuevaPelicula = async (req, res) => {
  try {
    const id = await PeliculaModel.createPelicula(req.body);
    res.status(201).json({ ok: true, mensaje: 'Película registrada', id });
  } catch (e) {
    res.status(500).json({ ok: false, mensaje: 'Error al registrar', error: e.message });
  }
};

export const listarGeneros = async (req, res) => {
  try {
    const generos = await PeliculaModel.getGeneros();
    res.json({ ok: true, data: generos });
  } catch (e) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener géneros' });
  }
};