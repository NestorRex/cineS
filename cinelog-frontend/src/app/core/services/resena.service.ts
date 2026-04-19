import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resena, NuevaResena } from '../interfaces/resena.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ResenaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/resenas`;

  // API GET reseñas por película
  getResenasByPelicula(idPelicula: number): Observable<{ ok: boolean; data: Resena[] }> {
    return this.http.get<{ ok: boolean; data: Resena[] }>(`${this.apiUrl}/${idPelicula}`);
  }

  // API POST reseña
  crearResena(resena: NuevaResena): Observable<{ ok: boolean; id: number }> {
    return this.http.post<{ ok: boolean; id: number }>(this.apiUrl, resena);
  }

  // API DELETE reseña
  eliminarResena(id: number): Observable<{ ok: boolean; mensaje: string }> {
    return this.http.delete<{ ok: boolean; mensaje: string }>(`${this.apiUrl}/${id}`);
  }
}