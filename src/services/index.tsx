import axios from "axios"
import { MoviesService } from "./MoviesService/movies.service"

class ApiClient {
  MoviesService = new MoviesService(axios)

  buildServices = ({ apiUrl }: Record<string, string>) => {
    axios.defaults.baseURL = apiUrl
    this.MoviesService = new MoviesService(axios)
  }
}

export const apiClient = new ApiClient()

export const moviesDB = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "22399a228ba9e8db01b4606882556636",
    language: "en-US"
  }
})
