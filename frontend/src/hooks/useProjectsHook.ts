import { useQuery } from '@tanstack/react-query'
import projectsService from '../services/projectsService'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
