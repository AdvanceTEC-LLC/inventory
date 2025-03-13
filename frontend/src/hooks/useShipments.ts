import { useQuery } from '@tanstack/react-query'
import shipmentsService from '../services/shipmentsService'

export const useShipments = () => {
  return useQuery({
    queryKey: ['shipments'],
    queryFn: shipmentsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
