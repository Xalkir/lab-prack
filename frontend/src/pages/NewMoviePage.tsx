
import { useNavigate } from 'react-router'
import { MovieForm } from '../components/MovieForm'
import type { Movie } from '../types/movie'

type NewMoviePageProps = {
  onCreate: (movie: Omit<Movie, 'id'>) => string
}

export function NewMoviePage({ onCreate }: NewMoviePageProps) {
  const navigate = useNavigate()

  function handleSave(movie: Omit<Movie, 'id'>) {
    const id = onCreate(movie)
    navigate(`/movies/${id}`)
  }

  return (
    <section>
      <h1>Добавление фильма или сериала</h1>

      <MovieForm
        onSave={handleSave}
        onCancel={() => navigate('/movies')}
      />
    </section>
  )
}
