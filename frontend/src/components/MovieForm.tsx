
import { useState, type FormEvent } from 'react'
import type { Movie, MovieType } from '../types/movie'
import { useTags } from '../hooks/useTags'

type MovieFormProps = {
  initialMovie?: Movie
  onSave: (movie: Omit<Movie, 'id'>) => void
  onCancel: () => void
  cancelLabel?: string
}

export function MovieForm({
  initialMovie,
  onSave,
  onCancel,
  cancelLabel = 'Отмена',
}: MovieFormProps) {
  const [title, setTitle] = useState(initialMovie?.title ?? '')
  const [description, setDescription] = useState(
    initialMovie?.description ?? '',
  )
  const [type, setType] = useState<MovieType>(
    initialMovie?.type ?? 'movie',
  )
  const [genre, setGenre] = useState(initialMovie?.genre ?? '')
  const [year, setYear] = useState(
    String(initialMovie?.year ?? ''),
  )
  const [rating, setRating] = useState(
    String(initialMovie?.rating ?? ''),
  )
  const [country, setCountry] = useState(
    initialMovie?.country ?? '',
  )
  const [error, setError] = useState('')

  const { load, retry } = useTags()

  const tags = load.status === 'success' ? load.data : []

  const selectedTagExists = tags.some(
    (tag) => tag.id === genre,
  )

  const canSave =
    load.status === 'success' && selectedTagExists

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!canSave) {
      setError(
        'Дождитесь загрузки жанров и выберите доступный жанр.',
      )
      return
    }

    const numericYear = Number(year)
    const numericRating = Number(rating)

    if (title.trim().length < 2 || title.trim().length > 100) {
      setError('Название должно содержать от 2 до 100 символов.')
      return
    }

    if (!description.trim() || !country.trim()) {
      setError('Заполни описание и страну.')
      return
    }

    if (
      !year ||
      !Number.isInteger(numericYear) ||
      numericYear < 1888 ||
      numericYear > new Date().getFullYear()
    ) {
      setError('Укажи корректный год выпуска.')
      return
    }

    if (
      rating === '' ||
      !Number.isFinite(numericRating) ||
      numericRating < 0 ||
      numericRating > 10
    ) {
      setError('Рейтинг должен быть числом от 0 до 10.')
      return
    }

    setError('')

    onSave({
      title: title.trim(),
      description: description.trim(),
      type,
      genre,
      year: numericYear,
      rating: numericRating,
      country: country.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <label htmlFor="movie-title">Название *</label>
      <input
        id="movie-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        minLength={2}
        maxLength={100}
        required
      />

      <label htmlFor="movie-description">Описание *</label>
      <textarea
        id="movie-description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />

      <label htmlFor="movie-type">Тип *</label>
      <select
        id="movie-type"
        value={type}
        onChange={(event) =>
          setType(event.target.value as MovieType)
        }
      >
        <option value="movie">Фильм</option>
        <option value="series">Сериал</option>
      </select>

      <label htmlFor="movie-genre">Жанр *</label>
      <select
        id="movie-genre"
        value={genre}
        required
        disabled={load.status !== 'success' || tags.length === 0}
        onChange={(event) => setGenre(event.target.value)}
      >
        <option value="">Выберите жанр</option>

        {genre !== '' && !selectedTagExists && (
          <option value={genre} disabled>
            Текущий жанр: {genre}
          </option>
        )}

        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>

      {load.status === 'loading' && (
        <p role="status">Загружаем жанры...</p>
      )}

      {load.status === 'error' && (
        <div>
          <p role="alert">{load.message}</p>
          <button type="button" onClick={retry}>
            Повторить загрузку
          </button>
        </div>
      )}

      {load.status === 'success' && tags.length === 0 && (
        <div>
          <p role="status">
            Жанры пока отсутствуют. Сохранение недоступно.
          </p>
          <button type="button" onClick={retry}>
            Повторить загрузку
          </button>
        </div>
      )}

      {load.status === 'success' &&
        tags.length > 0 &&
        genre !== '' &&
        !selectedTagExists && (
          <p role="alert">
            Прежний жанр отсутствует в справочнике.
            Выберите другой жанр.
          </p>
        )}

      <label htmlFor="movie-year">Год выпуска *</label>
      <input
        id="movie-year"
        type="number"
        value={year}
        onChange={(event) => setYear(event.target.value)}
        min="1888"
        max={new Date().getFullYear()}
        required
      />

      <label htmlFor="movie-rating">
        Рейтинг от 0 до 10 *
      </label>
      <input
        id="movie-rating"
        type="number"
        value={rating}
        onChange={(event) => setRating(event.target.value)}
        min="0"
        max="10"
        step="0.1"
        required
      />

      <label htmlFor="movie-country">Страна *</label>
      <input
        id="movie-country"
        value={country}
        onChange={(event) => setCountry(event.target.value)}
        required
      />

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={!canSave}>
        {initialMovie ? 'Сохранить изменения' : 'Сохранить'}
      </button>

      <button type="button" onClick={onCancel}>
        {cancelLabel}
      </button>
    </form>
  )
}
