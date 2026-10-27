import { Link } from 'react-router'
import type { Movie } from '../types/movie'

type MovieCardProps = {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="movie-card">
      <h2>
        <Link to={`/movies/${movie.id}`}>
          {movie.title}
        </Link>
      </h2>

      <p>{movie.description}</p>

      <p>
        <strong>Тип:</strong>{' '}
        {movie.type === 'movie' ? 'Фильм' : 'Сериал'}
      </p>

      <p>
        <strong>Жанр:</strong> {movie.genre}
      </p>

      <p>
        <strong>Год:</strong> {movie.year}
      </p>

      <p>
        <strong>Рейтинг:</strong> {movie.rating}
      </p>
    </article>
  )
}