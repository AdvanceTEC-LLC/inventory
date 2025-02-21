import { SentShipmentType, NewSentShipmentType } from '../types/sentShipment'
import apiService from './apiService'

const sentShipmentsService = apiService<SentShipmentType, NewSentShipmentType>({
  endpoint: 'sentShipments',
})

export default sentShipmentsService
