import { useQuery } from '@tanstack/react-query'
import stockService from '../services/stockService'

export const useStock = () => {
  return useQuery({
    queryKey: ['stock'],
    queryFn: stockService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
