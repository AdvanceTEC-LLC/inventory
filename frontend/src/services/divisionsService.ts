import { DivisionType, NewDivisionType } from '../types/division'
import apiService from './apiService'

const divisionsService = apiService<DivisionType, NewDivisionType>({
  endpoint: 'divisions',
})

export default divisionsService
