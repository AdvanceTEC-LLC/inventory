import { useQuery } from '@tanstack/react-query'
import manufacturersService from '../services/manufacturersService'

export const useManufacturers = () => {
  return useQuery({
    queryKey: ['manufacturers'],
    queryFn: manufacturersService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
