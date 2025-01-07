import axios from 'axios'

// Set up Axios interceptor
axios.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    const customError = {
      name: error.response?.data?.error || error.name,
      message: error.response?.data?.message || error.message,
      statusCode: error.response?.status || 500,
    }
    return Promise.reject(customError)
  }
)
