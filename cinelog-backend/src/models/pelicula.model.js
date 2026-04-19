import pool from '../config/db.js';

// GET todas las películas (con nombre de género)
export const getAllPeliculas = async () => {
  const [rows] = await pool.query(`
    SELECT p.*, g.nombre AS genero
    FROM peliculas p
    LEFT JOIN generos g ON p.id_genero = g.id
    ORDER BY p.id DESC
  `);
  return rows;
};

// GET película por ID
export const getPeliculaById = async (id) => {
  const [rows] = await pool.query(`
    SELECT p.*, g.nombre AS genero
    FROM peliculas p
    LEFT JOIN generos g ON p.id_genero = g.id
    WHERE p.id = ?
  `, [id]);
  return rows[0] || null;
};

// POST nueva película
export const createPelicula = async (data) => {
  const { titulo, anio, director, sinopsis, poster_url, tipo, id_genero } = data;
  const [result] = await pool.query(
    `INSERT INTO peliculas (titulo, anio, director, sinopsis, poster_url, tipo, id_genero)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [titulo, anio, director, sinopsis, poster_url, tipo, id_genero]
  );
  return result.insertId;
};

// GET géneros
export const getGeneros = async () => {
  const [rows] = await pool.query('SELECT * FROM generos');
  return rows;
};