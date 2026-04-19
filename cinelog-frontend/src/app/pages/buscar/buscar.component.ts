import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeliculaService } from '../../core/services/pelicula.service';
import { Pelicula } from '../../core/interfaces/pelicula.interface';
import { TarjetaComponent } from '../../components/tarjeta/tarjeta.component';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [FormsModule, TarjetaComponent],
  templateUrl: './buscar.component.html'
})
export class BuscarComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private peliculaService = inject(PeliculaService);

  // FORMULARIO TEMPLATE
  terminoBusqueda = '';
  tipoFiltro = 'todos';
  todas: Pelicula[] = [];
  resultados: Pelicula[] = [];
  buscado = false;

  ngOnInit(): void {
    // Leer queryParams de la URL
    this.route.queryParamMap.subscribe(params => {
      const tipo = params.get('tipo');
      const q = params.get('q');
      if (tipo) this.tipoFiltro = tipo;
      if (q) this.terminoBusqueda = q;

      this.peliculaService.getPeliculas().subscribe(res => {
        this.todas = res.data;
        if (q || tipo) this.buscar();
      });
    });
  }

  buscar(): void {
    this.buscado = true;
    this.resultados = this.todas.filter(p => {
      const coincideTitulo = this.terminoBusqueda
        ? p.titulo.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        : true;
      const coincideTipo = this.tipoFiltro !== 'todos' ? p.tipo === this.tipoFiltro : true;
      return coincideTitulo && coincideTipo;
    });
    // Actualizar queryParams en la URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: this.terminoBusqueda, tipo: this.tipoFiltro },
      queryParamsHandling: 'merge'
    });
  }

  onVerDetalle(id: number): void {
    this.router.navigate(['/pelicula', id]);
  }
}