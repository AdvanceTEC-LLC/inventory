import { ShipmentCrateType, NewShipmentCrateType } from '../types/shipmentCrate'
import apiService from './apiService'

const shipmentCratesService = apiService<
  ShipmentCrateType,
  NewShipmentCrateType
>({ endpoint: 'shipmentCrates' })

export default shipmentCratesService
