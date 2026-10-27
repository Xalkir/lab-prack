export type MovieType = 'movie' | 'series'

export type Movie = {
  id: string
  title: string
  description: string
  type: MovieType
  genre: string
  year: number
  rating: number
  country: string
}