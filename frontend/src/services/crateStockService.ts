import { CrateStockType, NewCrateStockType } from '../types/crateStock'
import apiService from './apiService'

const crateStockService = apiService<CrateStockType, NewCrateStockType>({
  endpoint: 'crateStock',
})

export default crateStockService
