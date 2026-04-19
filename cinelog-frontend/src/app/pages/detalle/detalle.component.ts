import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PeliculaService } from '../../core/services/pelicula.service';
import { Pelicula } from '../../core/interfaces/pelicula.interface';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private peliculaService = inject(PeliculaService);
  private router = inject(Router);

  pelicula: Pelicula | null = null;
  cargando = true;
  error = false;

  ngOnInit(): void {
    // Uso de paramMap para leer el :id de la URL
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!id) { this.router.navigate(['/404']); return; }

      this.peliculaService.getPeliculaById(id).subscribe({
        next: (res) => { this.pelicula = res.data; this.cargando = false; },
        error: () => { this.error = true; this.cargando = false; }
      });
    });
  }

  irAResenas(): void {
    if (this.pelicula) {
      // Navegación programática con parámetro
      this.router.navigate(['/resenas', this.pelicula.id]);
    }
  }
}