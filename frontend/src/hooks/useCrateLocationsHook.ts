import { useQuery } from '@tanstack/react-query'
import crateLocationsService from '../services/crateLocationsService'

export const useCrateLocations = () => {
  return useQuery({
    queryKey: ['crateLocations'],
    queryFn: crateLocationsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
