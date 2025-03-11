import axios, { AxiosResponse } from 'axios'
import { AssemblyCrateType, NewAssemblyCrateType } from '../types/assemblyCrate'
import apiService from './apiService'

const endpoint = 'assemblyCrates'

const assemblyCratesService = {
  ...apiService<AssemblyCrateType, NewAssemblyCrateType>({
    endpoint,
  }),

  deepCreate: async (
    data: NewAssemblyCrateType
  ): Promise<AssemblyCrateType> => {
    const response: AxiosResponse<AssemblyCrateType> = await axios.post(
      `/api/${endpoint}/deep`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  },

  bulkUpdate: async (
    data: AssemblyCrateType[]
  ): Promise<AssemblyCrateType[]> => {
    const response: AxiosResponse<AssemblyCrateType[]> = await axios.put(
      `/api/${endpoint}/bulk`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  },
}

export default assemblyCratesService
