import { QueryClient } from '@tanstack/react-query'
import { Button } from '@mui/material'

import cratesService from '../../services/cratesService'
import crateLocationsService from '../../services/crateLocationsService'
import crateStockService from '../../services/crateStockService'
import manufacturersService from '../../services/manufacturersService'
import materialsService from '../../services/materialsService'
import projectsService from '../../services/projectsService'
import receivedShipmentsService from '../../services/receivedShipmentsService'
import sentShipmentsService from '../../services/sentShipmentsService'
import shelfLocationsService from '../../services/shelfLocationsService'
import shipmentsService from '../../services/shipmentsService'
import shipmentCratesService from '../../services/shipmentCratesService'
import stagingAreasService from '../../services/stagingAreasService'
import stockService from '../../services/stockService'

const Debug = () => {
  const queryClient = new QueryClient()

  const resetDatabase = async () => {
    try {
      await cratesService.removeAll()
      await crateLocationsService.removeAll()
      await crateStockService.removeAll()
      await manufacturersService.removeAll()
      await materialsService.removeAll()
      await projectsService.removeAll()
      await receivedShipmentsService.removeAll()
      await sentShipmentsService.removeAll()
      await shelfLocationsService.removeAll()
      await shipmentsService.removeAll()
      await shipmentCratesService.removeAll()
      await stagingAreasService.removeAll()
      await stockService.removeAll()

      await queryClient.invalidateQueries()
    } catch (error) {
      console.log(error)
    }
  }

  const reset = () => {
    void resetDatabase()
  }

  return (
    <Button fullWidth variant="contained" onClick={reset}>
      Reset Database
    </Button>
  )
}

export default Debug
