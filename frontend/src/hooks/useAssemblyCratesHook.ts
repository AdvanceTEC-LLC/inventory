import { useQuery } from '@tanstack/react-query'
import assemblyCratesService from '../services/assemblyCratesService'

export const useAssemblyCrates = () => {
  return useQuery({
    queryKey: ['assemblyCrates'],
    queryFn: assemblyCratesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
