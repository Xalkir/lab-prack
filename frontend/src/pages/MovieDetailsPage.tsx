import { Link, useParams } from 'react-router'
import { movies } from '../data/movies'

export function MovieDetailsPage() {
  const { id } = useParams()

  const movie = movies.find((item) => item.id === id)

  if (!movie) {
    return (
      <section>
        <h1>Фильм или сериал не найден</h1>

        <p>
          Записи с таким идентификатором не существует.
        </p>

        <Link to="/movies">
          К каталогу
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h1>{movie.title}</h1>

      <p>
        <strong>Описание:</strong> {movie.description}
      </p>

      <p>
        <strong>Тип:</strong>{' '}
        {movie.type === 'movie' ? 'Фильм' : 'Сериал'}
      </p>

      <p>
        <strong>Жанр:</strong> {movie.genre}
      </p>

      <p>
        <strong>Год выпуска:</strong> {movie.year}
      </p>

      <p>
        <strong>Рейтинг:</strong> {movie.rating}
      </p>

      <p>
        <strong>Страна:</strong> {movie.country}
      </p>

      <Link to="/movies">
        ← Вернуться к каталогу
      </Link>
    </section>
  )
}