import { useEffect, useState } from "react"
import { Cast, CastElement } from "../interfaces/cast"
import { MovieFull } from "../interfaces/movieDetails"
import { moviesDB } from "../services"

interface MovieDetails {
  isLoading: boolean
  movieFull?: MovieFull
  cast: CastElement[]
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: []
  })

  const getMovieDetails = async () => {
    const movieDetailsPromise = moviesDB.get<MovieFull>(`/movie/${movieId}`)
    const castPromise = moviesDB.get<Cast>(`/movie/${movieId}/credits`)

    const [movieDetailsResp, castPromiseResp] = await Promise.all([
      movieDetailsPromise,
      castPromise
    ])

    setState({
      isLoading: false,
      movieFull: movieDetailsResp.data,
      cast: castPromiseResp.data.cast
    })
  }

  useEffect(() => {
    getMovieDetails()
  }, [])

  return {
    ...state
  }
}
