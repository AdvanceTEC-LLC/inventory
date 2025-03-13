import { ShelfLocationType, NewShelfLocationType } from '../types/shelfLocation'
import apiService from './apiService'

const shelfLocationsService = apiService<
  ShelfLocationType,
  NewShelfLocationType
>({
  endpoint: 'shelfLocations',
})

export default shelfLocationsService
