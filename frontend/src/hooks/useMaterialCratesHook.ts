import { useQuery } from '@tanstack/react-query'
import materialCratesService from '../services/materialCratesService'

export const useMaterialCrates = () => {
  return useQuery({
    queryKey: ['materialCrates'],
    queryFn: materialCratesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
