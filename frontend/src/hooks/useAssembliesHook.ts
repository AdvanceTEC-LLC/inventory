import { useQuery } from '@tanstack/react-query'
import assembliesService from '../services/assembliesService'

export const useAssemblies = () => {
  return useQuery({
    queryKey: ['assemblies'],
    queryFn: assembliesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
