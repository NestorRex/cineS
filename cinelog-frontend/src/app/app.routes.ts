import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./pages/catalogo/catalogo.component').then(m => m.CatalogoComponent)
  },
  {
    // Ruta con paramsMap
    path: 'pelicula/:id',
    loadComponent: () => import('./pages/detalle/detalle.component').then(m => m.DetalleComponent)
  },
  {
    path: 'agregar',
    loadComponent: () => import('./pages/agregar/agregar.component').then(m => m.AgregarComponent)
  },
  {
    // Ruta con queryParams
    path: 'buscar',
    loadComponent: () => import('./pages/buscar/buscar.component').then(m => m.BuscarComponent)
  },
  {
    // Reseñas con parámetro en URL
    path: 'resenas/:idPelicula',
    loadComponent: () => import('./pages/resenas/resenas.component').then(m => m.ResenasComponent)
  },
  {
    path: 'inicio',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    // Ruta no encontrada
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];