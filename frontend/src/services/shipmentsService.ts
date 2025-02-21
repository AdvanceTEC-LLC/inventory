import { ShipmentType, NewShipmentType } from '../types/shipment'
import apiService from './apiService'

const shipmentsService = apiService<ShipmentType, NewShipmentType>({
  endpoint: 'shipments',
})

export default shipmentsService
