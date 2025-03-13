import { useQuery } from '@tanstack/react-query'
import shelfLocationsService from '../services/shelfLocationsService'

export const useShelfLocations = () => {
  return useQuery({
    queryKey: ['shelfLocations'],
    queryFn: shelfLocationsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
