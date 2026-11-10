
import { Link } from 'react-router'
import type { Movie } from '../types/movie'
import { useTags } from '../hooks/useTags'

type MovieCardProps = {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const { load } = useTags()

  const genreName =
    load.status === 'success'
      ? load.data.find((tag) => tag.id === movie.genre)?.name ?? movie.genre
      : movie.genre

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
        <strong>Жанр:</strong> {genreName}
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
