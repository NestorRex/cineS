export interface Pelicula {
  id: number;
  titulo: string;
  anio: number;
  director: string;
  sinopsis: string;
  poster_url: string;
  tipo: 'pelicula' | 'serie';
  id_genero: number;
  genero?: string;
}

export interface Genero {
  id: number;
  nombre: string;
}