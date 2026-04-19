export interface Resena {
  id: number;
  id_pelicula: number;
  autor: string;
  comentario: string;
  calificacion: number;
  fecha: string;
}

export interface NuevaResena {
  id_pelicula: number;
  autor: string;
  comentario: string;
  calificacion: number;
}