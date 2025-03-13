import axios, { AxiosResponse } from 'axios'
import { MaterialCrateType, NewMaterialCrateType } from '../types/materialCrate'
import apiService from './apiService'

const endpoint = 'materialCrates'

const materialCratesService = {
  ...apiService<MaterialCrateType, NewMaterialCrateType>({
    endpoint,
  }),

  bulkUpdate: async (
    data: MaterialCrateType[]
  ): Promise<MaterialCrateType[]> => {
    const response: AxiosResponse<MaterialCrateType[]> = await axios.put(
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

export default materialCratesService
