import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResenaService } from '../../core/services/resena.service';
import { PeliculaService } from '../../core/services/pelicula.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { Resena } from '../../core/interfaces/resena.interface';
import { Pelicula } from '../../core/interfaces/pelicula.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-resenas',
  standalone: true,
  imports: [FormsModule, RouterLink, DatePipe],
  templateUrl: './resenas.component.html'
})
export class ResenasComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private resenaService = inject(ResenaService);
  private peliculaService = inject(PeliculaService);
  private notifService = inject(NotificacionService);

  pelicula: Pelicula | null = null;
  resenas: Resena[] = [];
  cargando = true;
  enviando = false;

  // Modelo para formulario template de nueva reseña
  nuevaResena = { autor: '', comentario: '', calificacion: 5 };

  ngOnInit(): void {
    // paramMap para leer :idPelicula
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('idPelicula'));
      if (!id) { this.router.navigate(['/404']); return; }

      this.peliculaService.getPeliculaById(id).subscribe(res => {
        this.pelicula = res.data;
      });

      this.cargarResenas(id);
    });
  }

  cargarResenas(id: number): void {
    this.cargando = true;
    this.resenaService.getResenasByPelicula(id).subscribe({
      next: (res) => { this.resenas = res.data; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  // API POST reseña
  publicarResena(): void {
    if (!this.pelicula || !this.nuevaResena.autor || !this.nuevaResena.comentario) {
      this.notifService.mostrar('Completa todos los campos', 'error');
      return;
    }
    this.enviando = true;
    this.resenaService.crearResena({
      id_pelicula: this.pelicula.id,
      ...this.nuevaResena
    }).subscribe({
      next: () => {
        this.notifService.mostrar('¡Reseña publicada! 💬', 'exito');
        this.nuevaResena = { autor: '', comentario: '', calificacion: 5 };
        this.cargarResenas(this.pelicula!.id);
        this.enviando = false;
      },
      error: () => {
        this.notifService.mostrar('Error al publicar reseña', 'error');
        this.enviando = false;
      }
    });
  }

  // API DELETE reseña
  eliminarResena(id: number): void {
    this.resenaService.eliminarResena(id).subscribe({
      next: () => {
        this.resenas = this.resenas.filter(r => r.id !== id);
        this.notifService.mostrar('Reseña eliminada', 'info');
      },
      error: () => this.notifService.mostrar('Error al eliminar', 'error')
    });
  }

  get promedioCalificacion(): string {
    if (!this.resenas.length) return 'Sin reseñas';
    const avg = this.resenas.reduce((s, r) => s + r.calificacion, 0) / this.resenas.length;
    return avg.toFixed(1) + ' / 5';
  }

  estrellas(n: number): string {
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }
}