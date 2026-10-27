
import { useState, type FormEvent } from 'react'
import type { Movie, MovieType } from '../types/movie'

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
  const [description, setDescription] = useState(initialMovie?.description ?? '')
  const [type, setType] = useState<MovieType>(initialMovie?.type ?? 'movie')
  const [genre, setGenre] = useState(initialMovie?.genre ?? '')
  const [year, setYear] = useState(String(initialMovie?.year ?? ''))
  const [rating, setRating] = useState(String(initialMovie?.rating ?? ''))
  const [country, setCountry] = useState(initialMovie?.country ?? '')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const numericYear = Number(year)
    const numericRating = Number(rating)

    if (title.trim().length < 2 || title.trim().length > 100) {
      setError('Название должно содержать от 2 до 100 символов.')
      return
    }

    if (!description.trim() || !genre.trim() || !country.trim()) {
      setError('Заполни описание, жанр и страну.')
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

    onSave({
      title: title.trim(),
      description: description.trim(),
      type,
      genre: genre.trim(),
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
        onChange={(event) => setType(event.target.value as MovieType)}
      >
        <option value="movie">Фильм</option>
        <option value="series">Сериал</option>
      </select>

      <label htmlFor="movie-genre">Жанр *</label>
      <input
        id="movie-genre"
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
        required
      />

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

      <label htmlFor="movie-rating">Рейтинг от 0 до 10 *</label>
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

      <button type="submit">
        {initialMovie ? 'Сохранить изменения' : 'Сохранить'}
      </button>

      <button type="button" onClick={onCancel}>
        {cancelLabel}
      </button>
    </form>
  )
}
