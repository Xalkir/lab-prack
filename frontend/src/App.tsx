
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './app/AppLayout'
import { MoviesPage } from './pages/MoviesPage'
import { MovieDetailsPage } from './pages/MovieDetailsPage'
import { NewMoviePage } from './pages/NewMoviePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { movies as initialMovies } from './data/movies'
import type { Movie } from './types/movie'
import { EditMoviePage } from './pages/EditMoviePage'

function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies)

  const createMovie = (movie: Omit<Movie, 'id'>) => {
    const newMovie: Movie = {
      ...movie,
      id: crypto.randomUUID(),
    }

    setMovies((currentMovies) => [...currentMovies, newMovie])
    return newMovie.id
  }

  const updateMovie = (updatedMovie: Movie) => {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie,
      ),
    )
  }

  const deleteMovie = (id: string) => {
    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.id !== id),
    )
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={<Navigate to="/movies" replace />}
        />

        <Route
          path="/movies"
          element={
            <MoviesPage
              movies={movies}
            />
          }
        />

        <Route
          path="/movies/new"
          element={
            <NewMoviePage
              onCreate={createMovie}
            />
          }
        />

        <Route
          path="/movies/:id/edit"
          element={
            <EditMoviePage
             movies={movies}
             onUpdate={updateMovie}
            />
          }
        />

        <Route
          path="/movies/:id"
          element={
            <MovieDetailsPage
              movies={movies}
              onDelete={deleteMovie}
            />
          }
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  )
}

export default App
