import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculaService } from '../../core/services/pelicula.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { Pelicula } from '../../core/interfaces/pelicula.interface';
import { TarjetaComponent } from '../../components/tarjeta/tarjeta.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [TarjetaComponent, FormsModule],
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent implements OnInit {
  private peliculaService = inject(PeliculaService);
  private notificacionService = inject(NotificacionService);
  private router = inject(Router);

  peliculas: Pelicula[] = [];
  filtroTipo = 'todos';
  cargando = true;
  favoritos: Pelicula[] = [];

  ngOnInit(): void {
    this.peliculaService.getPeliculas().subscribe({
      next: (res) => {
        this.peliculas = res.data;
        this.cargando = false;
      },
      error: () => {
        this.notificacionService.mostrar('Error al cargar el catálogo', 'error');
        this.cargando = false;
      }
    });
  }

  get peliculasFiltradas(): Pelicula[] {
    if (this.filtroTipo === 'todos') return this.peliculas;
    return this.peliculas.filter(p => p.tipo === this.filtroTipo);
  }

  onVerDetalle(id: number): void {
    this.router.navigate(['/pelicula', id]);
  }

  onAgregarFavorito(pelicula: Pelicula): void {
    const yaExiste = this.favoritos.some(f => f.id === pelicula.id);
    if (!yaExiste) {
      this.favoritos.push(pelicula);
      this.notificacionService.mostrar(`"${pelicula.titulo}" agregada a favoritos ♥`, 'exito');
    } else {
      this.notificacionService.mostrar('Ya está en tus favoritos', 'info');
    }
  }

  irABuscar(): void {
    // queryParams desde código
    this.router.navigate(['/buscar'], { queryParams: { tipo: this.filtroTipo } });
  }
}