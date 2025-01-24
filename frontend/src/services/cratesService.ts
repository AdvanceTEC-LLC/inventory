import { CrateType, NewCrateType } from '../types/crate'
import apiService from './apiService'

const cratesService = apiService<CrateType, NewCrateType>({
  endpoint: 'crates',
})

export default cratesService
