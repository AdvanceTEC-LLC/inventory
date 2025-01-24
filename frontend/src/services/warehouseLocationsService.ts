import {
  WarehouseLocationType,
  NewWarehouseLocationType,
} from '../types/warehouseLocation'
import apiService from './apiService'

const warehouseLocationsService = apiService<
  WarehouseLocationType,
  NewWarehouseLocationType
>({
  endpoint: 'warehouseLocations',
})

export default warehouseLocationsService
