import { ManufacturerType, NewManufacturerType } from '../types/manufacturer'
import apiService from './apiService'

const manufacturersService = apiService<ManufacturerType, NewManufacturerType>({
  endpoint: 'manufacturers',
})

export default manufacturersService
