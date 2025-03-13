import axios, { AxiosResponse } from 'axios'

// Generic API service factory function
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
const apiService = <T, U>({ endpoint }: { endpoint: string }) => {
  const apiClient = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return {
    getAll: async (): Promise<T[]> => {
      const response: AxiosResponse<T[]> = await apiClient.get(endpoint)
      return response.data
    },

    getById: async (id: number): Promise<T> => {
      const response: AxiosResponse<T> = await apiClient.get(
        `${endpoint}/${id}`
      )
      return response.data
    },

    create: async (data: U): Promise<T> => {
      const response: AxiosResponse<T> = await apiClient.post(endpoint, data)
      return response.data
    },

    update: async (id: number, data: T): Promise<T> => {
      const response: AxiosResponse<T> = await apiClient.put(
        `${endpoint}/${id}`,
        data
      )
      return response.data
    },

    remove: async (id: number): Promise<T> => {
      const response: AxiosResponse<T> = await apiClient.delete(
        `${endpoint}/${id}`
      )
      return response.data
    },

    removeAll: async (): Promise<T> => {
      const response: AxiosResponse<T> = await apiClient.delete(endpoint)
      return response.data
    },
  }
}

export default apiService
