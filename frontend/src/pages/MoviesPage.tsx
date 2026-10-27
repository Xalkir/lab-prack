
import { useState } from 'react'
import { Link } from 'react-router'
import { MovieCard } from '../components/MovieCard'
import type { Movie, MovieType } from '../types/movie'

type MoviesPageProps = {
  movies: Movie[]
}

export function MoviesPage({ movies }: MoviesPageProps) {
  const [filter, setFilter] = useState<'all' | MovieType>('all')

  const filteredMovies = movies.filter((movie) => {
    return filter === 'all' || movie.type === filter
  })

  return (
    <section>
      <h1>Каталог фильмов и сериалов</h1>

      <p>
        Здесь представлены фильмы и сериалы из демонстрационного каталога.
      </p>

      <Link to="/movies/new" className="add-button">
        Добавить фильм или сериал
      </Link>

      <div className="movie-filter">
        <label htmlFor="movie-type">Показать:</label>
        <select
          id="movie-type"
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value as 'all' | MovieType)
          }
        >
          <option value="all">Все</option>
          <option value="movie">Только фильмы</option>
          <option value="series">Только сериалы</option>
        </select>
        <button
  type="button"
  onClick={() => setFilter('all')}
>
  Сбросить фильтр
</button>
      </div>

      {movies.length === 0 ? (
        <p>Фильмов и сериалов пока нет. Добавьте первую запись!</p>
      ) : filteredMovies.length === 0 ? (
        <p>По выбранному фильтру ничего не найдено.</p>
      ) : (
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}
