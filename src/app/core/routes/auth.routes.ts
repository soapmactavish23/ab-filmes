import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('../../features/movies/pages/explore-movies/explore-movies').then(
        (m) => m.ExploreMovies,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../../features/movies/pages/explore-movies/explore-movies').then(
        (m) => m.ExploreMovies,
      ),
  },
];
