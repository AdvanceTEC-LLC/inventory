import { StagingAreaType, NewStagingAreaType } from '../types/stagingArea'
import apiService from './apiService'

const stagingAreasService = apiService<StagingAreaType, NewStagingAreaType>({
  endpoint: 'stagingAreas',
})

export default stagingAreasService
