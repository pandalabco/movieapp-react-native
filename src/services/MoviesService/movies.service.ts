import { AxiosInstance } from "axios"
export class MoviesService {
  constructor(private client: AxiosInstance) {}
  getMovies() {
    return this.client.get(
      "/movie/550/?api_key=22399a228ba9e8db01b4606882556636"
    )
  }
}
