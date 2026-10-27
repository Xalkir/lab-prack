
import { Link, useNavigate, useParams } from 'react-router'
import type { Movie } from '../types/movie'

type MovieDetailsPageProps = {
  movies: Movie[]
  onDelete: (id: string) => void
}

export function MovieDetailsPage({
  movies,
  onDelete,
}: MovieDetailsPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()

  const movie = movies.find((item) => item.id === id)

  if (!movie) {
    return (
      <section>
        <h1>Фильм или сериал не найден</h1>
        <p>Записи с таким идентификатором не существует.</p>
        <Link to="/movies">К каталогу</Link>
      </section>
    )
  }

  function handleDelete() {
  const currentMovie = movies.find((item) => item.id === id)

  if (!currentMovie) {
    return
  }

  const confirmed = window.confirm(
    `Удалить «${currentMovie.title}»? Это действие нельзя отменить.`,
  )

  if (confirmed) {
    onDelete(currentMovie.id)
    navigate('/movies')
  }
}

  return (
    <section>
      <h1>{movie.title}</h1>

      <p><strong>Описание:</strong> {movie.description}</p>
      <p>
        <strong>Тип:</strong>{' '}
        {movie.type === 'movie' ? 'Фильм' : 'Сериал'}
      </p>
      <p><strong>Жанр:</strong> {movie.genre}</p>
      <p><strong>Год выпуска:</strong> {movie.year}</p>
      <p><strong>Рейтинг:</strong> {movie.rating}</p>
      <p><strong>Страна:</strong> {movie.country}</p>

      <div className="movie-actions">
        <Link to={`/movies/${movie.id}/edit`}>
          Редактировать
        </Link>

        <button type="button" onClick={handleDelete}>
          Удалить
        </button>

        <Link to="/movies">
          ← Вернуться к каталогу
        </Link>
      </div>
    </section>
  )
}
