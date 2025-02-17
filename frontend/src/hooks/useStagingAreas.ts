import { useQuery } from '@tanstack/react-query'
import stagingAreasService from '../services/stagingAreasService'

export const useStagingAreas = () => {
  return useQuery({
    queryKey: ['stagingAreas'],
    queryFn: stagingAreasService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
