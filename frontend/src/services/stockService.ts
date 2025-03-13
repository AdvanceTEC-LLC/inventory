import { StockType, NewStockType } from '../types/stock'
import apiService from './apiService'

const stockService = apiService<StockType, NewStockType>({
  endpoint: 'stock',
})

export default stockService
