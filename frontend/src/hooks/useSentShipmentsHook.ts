import { useQuery } from '@tanstack/react-query'
import sentShipmentsService from '../services/sentShipmentsService'

export const useSentShipments = () => {
  return useQuery({
    queryKey: ['sentShipments'],
    queryFn: sentShipmentsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
