import DebugCard from './DebugCard'
import { QueryClient } from '@tanstack/react-query'
import Container from '../ATEC UI/Container'

import materialsService from '../../services/materialsService'
import { materialColumns } from './Materials'

import stockService from '../../services/stockService'
import { stockColumns } from './Stock'

import projectsService from '../../services/projectsService'
import { projectColumns } from './Projects'

import manufacturersService from '../../services/manufacturersService'
import { manufacturerColumns } from './Manufacturers'

import shelfLocationsService from '../../services/shelfLocationsService'
import { shelfLocationColumns } from './ShelfLocations'

import cratesService from '../../services/cratesService'
import { crateColumns } from './Crates'

import shipmentsService from '../../services/shipmentsService'
import { shipmentColumns } from './Shipments'

import shipmentCratesService from '../../services/shipmentCratesService'
import { shipmentCrateColumns } from './ShipmentCrates'

import crateStockService from '../../services/crateStockService'
import { crateStockColumns } from './CrateStock'
import warehouseLocationsService from '../../services/warehouseLocationsService'
import receivedShipmentsService from '../../services/receivedShipmentsService'
import stagingAreasService from '../../services/stagingAreasService'
import sentShipmentsService from '../../services/sentShipmentsService'
import { Button } from '@mui/material'

const Debug = () => {
  const queryClient = new QueryClient()

  const resetDatabase = async () => {
    try {
      await cratesService.removeAll()
      await crateStockService.removeAll()
      await manufacturersService.removeAll()
      await materialsService.removeAll()
      await projectsService.removeAll()
      await receivedShipmentsService.removeAll()
      await sentShipmentsService.removeAll()
      await shelfLocationsService.removeAll()
      await shipmentCratesService.removeAll()
      await shipmentsService.removeAll()
      await stagingAreasService.removeAll()
      await stockService.removeAll()
      await warehouseLocationsService.removeAll()

      queryClient.invalidateQueries({ queryKey: ['materials'] })
      queryClient.invalidateQueries({ queryKey: ['stock'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['manufacturers'] })
      queryClient.invalidateQueries({ queryKey: ['crates'] })
      queryClient.invalidateQueries({ queryKey: ['shelfLocations'] })
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
      queryClient.invalidateQueries({ queryKey: ['crateStock'] })
      queryClient.invalidateQueries({ queryKey: ['shipmentCrates'] })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col gap-y-8">
      <Button
        variant="contained"
        onClick={() => {
          void resetDatabase()
        }}
      >
        Reset Database
      </Button>

      <DebugCard
        title={'Materials'}
        columns={materialColumns}
        service={{
          getAll: materialsService.getAll,
        }}
      />

      <DebugCard
        title={'Stock'}
        columns={stockColumns}
        service={{
          getAll: stockService.getAll,
        }}
      />

      <DebugCard
        title={'Projects'}
        columns={projectColumns}
        service={{
          getAll: projectsService.getAll,
        }}
      />

      <DebugCard
        title={'Manufacturers'}
        columns={manufacturerColumns}
        service={{
          getAll: manufacturersService.getAll,
        }}
      />

      <DebugCard
        title={'Shelf Locations'}
        columns={shelfLocationColumns}
        service={{
          getAll: shelfLocationsService.getAll,
        }}
      />

      <DebugCard
        title={'Crates'}
        columns={crateColumns}
        service={{
          getAll: cratesService.getAll,
        }}
      />

      <DebugCard
        title={'Shipments'}
        columns={shipmentColumns}
        service={{
          getAll: shipmentsService.getAll,
        }}
      />

      <DebugCard
        title={'Shipment Crates'}
        columns={shipmentCrateColumns}
        service={{
          getAll: shipmentCratesService.getAll,
        }}
      />

      <DebugCard
        title={'Crate Stock'}
        columns={crateStockColumns}
        service={{
          getAll: crateStockService.getAll,
        }}
      />
    </div>
  )
}

export default Debug
