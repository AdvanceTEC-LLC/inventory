import axios, { AxiosError } from 'axios'

// Custom Error class to handle the rejection properly
class APIError extends Error {
  statusCode: number

  constructor(name: string, message: string, statusCode: number) {
    super(message)
    this.name = name
    this.statusCode = statusCode
    // Ensure the prototype chain is correct for custom errors
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

// Set up Axios interceptor
axios.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error: AxiosError<{ error?: string; message?: string }>) => {
    const customError = new APIError(
      error.response?.data.error ?? error.name,
      error.response?.data.message ?? error.message,
      error.response?.status ?? 500
    )
    return Promise.reject(customError)
  }
)
