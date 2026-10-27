
import { Link, useNavigate, useParams } from 'react-router'
import { MovieForm } from '../components/MovieForm'
import type { Movie } from '../types/movie'

type EditMoviePageProps = {
  movies: Movie[]
  onUpdate: (movie: Movie) => void
}

export function EditMoviePage({
  movies,
  onUpdate,
}: EditMoviePageProps) {
  const { id } = useParams()
  const navigate = useNavigate()

  const movie = movies.find((item) => item.id === id)

  if (!movie) {
    return (
      <section>
        <h1>Фильм или сериал не найден</h1>
        <Link to="/movies">Вернуться к каталогу</Link>
      </section>
    )
  }

  function handleSave(updatedFields: Omit<Movie, 'id'>) {
  onUpdate({
    ...updatedFields,
    id: id!,
  })

  navigate(`/movies/${id}`)
}

  return (
    <section>
      <h1>Редактирование фильма или сериала</h1>

      <MovieForm
        initialMovie={movie}
        onSave={handleSave}
        onCancel={() => navigate(`/movies/${movie.id}`)}
      />
    </section>
  )
}
