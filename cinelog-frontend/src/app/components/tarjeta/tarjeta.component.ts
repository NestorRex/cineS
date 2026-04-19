import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Pelicula } from '../../core/interfaces/pelicula.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta.component.html'
})
export class TarjetaComponent {
  // @Input: recibe datos del padre (CatalogoComponent)
  @Input({ required: true }) pelicula!: Pelicula;
  @Input() mostrarEliminar = false;

  // @Output: emite evento al padre cuando el usuario quiere ver detalle
  @Output() verDetalle = new EventEmitter<number>();
  @Output() agregarFavorito = new EventEmitter<Pelicula>();

  private router = inject(Router);

  onVerDetalle(): void {
    // Emite el ID al componente padre
    this.verDetalle.emit(this.pelicula.id);
    // Navegación programática
    this.router.navigate(['/pelicula', this.pelicula.id]);
  }

  onAgregarFavorito(): void {
    this.agregarFavorito.emit(this.pelicula);
  }

  get estrellas(): string {
    return '★'.repeat(5);
  }
}