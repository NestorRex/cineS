import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PeliculaService } from '../../core/services/pelicula.service';
import { Pelicula } from '../../core/interfaces/pelicula.interface';
import { TarjetaComponent } from '../../components/tarjeta/tarjeta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TarjetaComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private peliculaService = inject(PeliculaService);
  private router = inject(Router);

  peliculasDestacadas: Pelicula[] = [];
  cargando = true;

  ngOnInit(): void {
    this.peliculaService.getPeliculas().subscribe({
      next: (res) => {
        this.peliculasDestacadas = res.data.slice(0, 3);
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }

  // Navegación programática
  irACatalogo(): void {
    this.router.navigate(['/catalogo']);
  }

  // Recibe el @Output del TarjetaComponent
  onVerDetalle(id: number): void {
    this.router.navigate(['/pelicula', id]);
  }
}