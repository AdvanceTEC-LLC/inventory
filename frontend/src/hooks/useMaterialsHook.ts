import { useQuery } from '@tanstack/react-query'
import materialsService from '../services/materialsService'

export const useMaterials = () => {
  return useQuery({
    queryKey: ['materials'],
    queryFn: materialsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
