import { CrateLocationType, NewCrateLocationType } from '../types/crateLocation'
import apiService from './apiService'

const crateLocationsService = apiService<
  CrateLocationType,
  NewCrateLocationType
>({
  endpoint: 'crateLocations',
})

export default crateLocationsService
