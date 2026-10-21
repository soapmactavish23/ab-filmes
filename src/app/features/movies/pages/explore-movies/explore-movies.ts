import { Component, inject, linkedSignal, signal } from '@angular/core';
import { MoviesList } from '../../../../shared/components/movies-list/movies-list';
import { MoviesFilter } from '../../components/movies-filter/movies-filter';
import { MoviesApi } from '../../services/movies-api';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-explore-movies',
  imports: [MoviesList, MoviesFilter],
  templateUrl: './explore-movies.html',
  styleUrl: './explore-movies.css',
})
export class ExploreMovies {
  private readonly _moviesApi = inject(MoviesApi);

  movieTitleFilter = signal('');
  movieCategoryFilter = signal('');

  moveisResource = rxResource({
    params: () => true,
    stream: () => this._moviesApi.getMovies(),
  });

  moviesFiltered = linkedSignal(() => {
    const moviesList = this.moveisResource.value() ?? [];
    const ERROR_ON_RESPONSE = !!this.moveisResource.error();

    if (ERROR_ON_RESPONSE) return [];

    const titleSearch = this.movieTitleFilter().toLowerCase().trim();
    const categorySearch = this.movieCategoryFilter().toLowerCase().trim();

    if (!titleSearch && !categorySearch) return moviesList;

    return moviesList.filter((movie) => {
      const matchesTitle = titleSearch ? movie.titulo.toLowerCase().includes(titleSearch) : true;
      const matchesCategory = categorySearch
        ? movie.genero.toLowerCase().includes(categorySearch)
        : true;

      return matchesTitle && matchesCategory;
    });
  });

  adicionarFilme() {}
}
