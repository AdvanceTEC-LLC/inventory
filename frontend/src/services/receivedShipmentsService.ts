import {
  ReceivedShipmentType,
  NewReceivedShipmentType,
} from '../types/receivedShipment'
import apiService from './apiService'

const receivedShipmentsService = apiService<
  ReceivedShipmentType,
  NewReceivedShipmentType
>({
  endpoint: 'receivedShipments',
})

export default receivedShipmentsService
