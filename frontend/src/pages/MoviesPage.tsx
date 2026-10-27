import { Link } from 'react-router'
import { MovieCard } from '../components/MovieCard'
import { movies } from '../data/movies'

export function MoviesPage() {
  return (
    <section>
      <h1>Каталог фильмов и сериалов</h1>

      <p>
        Здесь представлены фильмы и сериалы из демонстрационного каталога.
      </p>

      <Link
  to="/movies/new"
  className="add-button"
>
  Добавить фильм или сериал
</Link>

      {movies.length === 0 ? (
        <p>Фильмов и сериалов пока нет.</p>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}