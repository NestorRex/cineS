import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="text-center py-5">
      <h1 class="display-1 fw-bold text-warning">404</h1>
      <h3>Página no encontrada</h3>
      <p class="text-muted">La ruta que buscas no existe en CineLog.</p>
      <button class="btn btn-warning me-2" (click)="volver()">← Volver</button>
      <a routerLink="/" class="btn btn-outline-secondary">Ir al inicio</a>
    </div>
  `
})
export class NotFoundComponent {
  private router = inject(Router);
  volver(): void { this.router.navigate(['/']); }
}