import axios, { AxiosResponse } from 'axios'
import { CrateType, NewCrateType } from '../types/crate'
import apiService from './apiService'

const endpoint = 'crates'

const cratesService = {
  ...apiService<CrateType, NewCrateType>({
    endpoint,
  }),

  bulkUpdate: async (data: CrateType[]): Promise<CrateType[]> => {
    const response: AxiosResponse<CrateType[]> = await axios.put(
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

export default cratesService
