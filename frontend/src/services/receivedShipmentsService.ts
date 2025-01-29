import axios from 'axios'
import {
  ReceivedShipmentType,
  NewReceivedShipmentType,
} from '../types/receivedShipment'
import apiService from './apiService'

const endpoint = 'receivedShipments'

const receivedShipmentsService = {
  ...apiService<ReceivedShipmentType, NewReceivedShipmentType>({
    endpoint,
  }),

  deepCreate: async (
    data: NewReceivedShipmentType
  ): Promise<ReceivedShipmentType> => {
    const response = await axios.post(`/api/${endpoint}/deep`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  },
}

export default receivedShipmentsService
