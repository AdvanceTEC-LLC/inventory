import axios, { AxiosResponse } from 'axios'
import { SentShipmentType, NewSentShipmentType } from '../types/sentShipment'
import apiService from './apiService'

const endpoint = 'sentShipments'

const sentShipmentsService = {
  ...apiService<SentShipmentType, NewSentShipmentType>({
    endpoint,
  }),

  deepCreate: async (data: NewSentShipmentType): Promise<SentShipmentType> => {
    const response: AxiosResponse<SentShipmentType> = await axios.post(
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
}

export default sentShipmentsService
