import { Injectable, signal } from '@angular/core';

export interface Notificacion {
  mensaje: string;
  tipo: 'exito' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class NotificacionService {
  // APORTACIÓN EXTRA #1: Signals de Angular
  notificacion = signal<Notificacion | null>(null);

  mostrar(mensaje: string, tipo: 'exito' | 'error' | 'info' = 'info'): void {
    this.notificacion.set({ mensaje, tipo });
    setTimeout(() => this.notificacion.set(null), 3500);
  }
}