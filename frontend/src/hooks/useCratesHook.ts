import { useQuery } from '@tanstack/react-query'
import cratesService from '../services/cratesService'

export const useCrates = () => {
  return useQuery({
    queryKey: ['crates'],
    queryFn: cratesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
