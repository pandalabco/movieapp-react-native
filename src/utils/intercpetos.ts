import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from "axios"

type ClientsType = {
  moviesDb: AxiosInstance
}

export const clients: ClientsType = {
  moviesDb: axios.create()
}

export const applyInterceptors = () => {
  /**
     * @Description Add Auth token to every request on the moviesDb instance
     */
  clients.moviesDb.interceptors.request.use(async (config: any) => {
    const newConfig = { ...config }
    const authToken = "123" // from redux state
    if (authToken) {
      newConfig.headers.Authorization = `Bearer ${authToken}`
    }
    return newConfig
  })
  /**
     * @Description Add Auth token to every request on the moviesDb instance
     */
  clients.moviesDb.interceptors.response.use(
    async (response: any) => {
      if (typeof response.data !== "object") {
        throw "Backend is sending wrong format"
      }
      return response
    },
    async (error: any) => {
      if (error.response.status === 401) {
        throw "Unauthorized request"
      }
      return Promise.reject(error)
    }
  )
}
