import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula, Genero } from '../interfaces/pelicula.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PeliculaService {
  // inject() en lugar de constructor — requerido por el proyecto
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/peliculas`;

  getPeliculas(): Observable<{ ok: boolean; data: Pelicula[] }> {
    return this.http.get<{ ok: boolean; data: Pelicula[] }>(this.apiUrl);
  }

  getPeliculaById(id: number): Observable<{ ok: boolean; data: Pelicula }> {
    return this.http.get<{ ok: boolean; data: Pelicula }>(`${this.apiUrl}/${id}`);
  }

  getGeneros(): Observable<{ ok: boolean; data: Genero[] }> {
    return this.http.get<{ ok: boolean; data: Genero[] }>(`${this.apiUrl}/generos`);
  }

  // API POST
  crearPelicula(pelicula: Omit<Pelicula, 'id' | 'genero'>): Observable<{ ok: boolean; id: number }> {
    return this.http.post<{ ok: boolean; id: number }>(this.apiUrl, pelicula);
  }
}