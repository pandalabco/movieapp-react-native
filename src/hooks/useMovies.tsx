import { useEffect, useState } from "react"
import { Movie, MoviesDBTrending } from "../interfaces/movies"
import { moviesDB } from "../services"

interface moviesState {
  movies: Movie[]
  nowPlaying: Movie[]
  popular: Movie[]
  upcoming: Movie[]
}

export const useMovies = () => {
  const [moviesState, setMoviesState] = useState<moviesState>({
    movies: [],
    nowPlaying: [],
    popular: [],
    upcoming: []
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchTrendingMovie = async () => {
    try {
      setIsLoading(true)
      const trendingPromise = moviesDB.get<MoviesDBTrending>(
        "/trending/all/day?page=1"
      )
      const nowPlayingPromise = moviesDB.get<MoviesDBTrending>(
        "/movie/now_playing?page=1"
      )
      const popularPromise = moviesDB.get<MoviesDBTrending>(
        "/movie/popular?page=1"
      )
      const upcomingPromise = moviesDB.get<MoviesDBTrending>(
        "/movie/upcoming?page=1"
      )
      const res = await Promise.all([
        trendingPromise,
        nowPlayingPromise,
        popularPromise,
        upcomingPromise
      ])
      setMoviesState({
        movies: res[0].data.results,
        nowPlaying: res[1].data.results,
        popular: res[2].data.results,
        upcoming: res[3].data.results
      })
      setIsLoading(false)
    } catch (error) {
      console.log("🚀 ~ file: index.tsx ~ line 16 ~ fetchData ~ error!!", error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchTrendingMovie()
  }, [])
  return {
    ...moviesState,
    isLoading
  }
}
