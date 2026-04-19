import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PeliculaService } from '../../core/services/pelicula.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { Genero } from '../../core/interfaces/pelicula.interface';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar.component.html'
})
export class AgregarComponent implements OnInit {
  // inject() para todas las dependencias
  private fb = inject(FormBuilder);
  private peliculaService = inject(PeliculaService);
  private notificacionService = inject(NotificacionService);
  private router = inject(Router);

  generos: Genero[] = [];
  enviando = false;

  // FORMULARIO REACTIVO con mínimo 3 validators por campo, variados
  form = this.fb.group({
    titulo: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150)
    ]],
    anio: [null as number | null, [
      Validators.required,
      Validators.min(1888),
      Validators.max(new Date().getFullYear())
    ]],
    director: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]],
    sinopsis: ['', [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(1000)
    ]],
    poster_url: ['', [
      Validators.required,
      Validators.pattern('https?://.+')
    ]],
    tipo: ['pelicula', [Validators.required]],
    id_genero: [null as number | null, [Validators.required]]
  });

  ngOnInit(): void {
    this.peliculaService.getGeneros().subscribe({
      next: (res) => { this.generos = res.data; },
      error: () => this.notificacionService.mostrar('Error al cargar géneros', 'error')
    });
  }

  // Helpers para mostrar errores en el template
  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificacionService.mostrar('Corrige los errores del formulario', 'error');
      return;
    }
    this.enviando = true;
    this.peliculaService.crearPelicula(this.form.value as any).subscribe({
      next: (res) => {
        this.notificacionService.mostrar('¡Película registrada exitosamente! 🎬', 'exito');
        this.enviando = false;
        // Navegación programática tras éxito
        this.router.navigate(['/pelicula', res.id]);
      },
      error: () => {
        this.notificacionService.mostrar('Error al guardar la película', 'error');
        this.enviando = false;
      }
    });
  }
}