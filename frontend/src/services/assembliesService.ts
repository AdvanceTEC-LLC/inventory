import axios from 'axios'
import { AssemblyType, NewAssemblyType } from '../types/assembly'
import apiService from './apiService'

const endpoint = 'assemblies'

const assembliessService = {
  ...apiService<AssemblyType, NewAssemblyType>({
    endpoint,
  }),

  deepCreate: async (data: NewAssemblyType): Promise<AssemblyType> => {
    const response = await axios.post(`/api/${endpoint}/deep`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  },
}
export default assembliessService
