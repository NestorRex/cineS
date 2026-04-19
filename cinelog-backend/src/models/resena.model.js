import pool from '../config/db.js';

// GET reseñas de una película
export const getResenasByPelicula = async (id_pelicula) => {
  const [rows] = await pool.query(
    `SELECT * FROM resenas WHERE id_pelicula = ? ORDER BY fecha DESC`,
    [id_pelicula]
  );
  return rows;
};

// POST nueva reseña
export const createResena = async (data) => {
  const { id_pelicula, autor, comentario, calificacion } = data;
  const [result] = await pool.query(
    `INSERT INTO resenas (id_pelicula, autor, comentario, calificacion) VALUES (?, ?, ?, ?)`,
    [id_pelicula, autor, comentario, calificacion]
  );
  return result.insertId;
};

// DELETE reseña
export const deleteResena = async (id) => {
  const [result] = await pool.query('DELETE FROM resenas WHERE id = ?', [id]);
  return result.affectedRows;
};