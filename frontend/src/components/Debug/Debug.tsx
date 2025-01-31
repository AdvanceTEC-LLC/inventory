import DebugCard from './DebugCard'
import { QueryClient } from '@tanstack/react-query'
import Container from '../ATEC UI/Container'
import Button from '../ATEC UI/Button'

import materialsService from '../../services/materialsService'
import { materialColumns } from './Materials'

import stockService from '../../services/stockService'
import { stockColumns } from './Stock'

import projectsService from '../../services/projectsService'
import { projectColumns } from './Projects'

import vendorsService from '../../services/vendorsService'
import { vendorColumns } from './Vendors'

import storagesService from '../../services/storagesService'
import { storageColumns } from './Storages'

import cratesService from '../../services/cratesService'
import { crateColumns } from './Crates'

import shipmentsService from '../../services/shipmentsService'
import { shipmentColumns } from './Shipments'

import shipmentCratesService from '../../services/shipmentCratesService'
import { shipmentCrateColumns } from './ShipmentCrates'

import crateStockService from '../../services/crateStockService'
import { crateStockColumns } from './CrateStock'

const Debug = () => {
  const queryClient = new QueryClient()

  const resetDatabase = async () => {
    try {
      await materialsService.removeAll()
      await stockService.removeAll()
      await projectsService.removeAll()
      await vendorsService.removeAll()
      await cratesService.removeAll()
      await storagesService.removeAll()
      await shipmentsService.removeAll()
      await crateStockService.removeAll()
      await shipmentCratesService.removeAll()

      queryClient.invalidateQueries({ queryKey: ['materials'] })
      queryClient.invalidateQueries({ queryKey: ['stock'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      queryClient.invalidateQueries({ queryKey: ['crates'] })
      queryClient.invalidateQueries({ queryKey: ['storages'] })
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
      queryClient.invalidateQueries({ queryKey: ['crateStock'] })
      queryClient.invalidateQueries({ queryKey: ['shipmentCrates'] })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col gap-y-8">
      <Container>
        <Button
          text="Reset Database"
          onClick={() => {
            void resetDatabase()
          }}
        />
      </Container>

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
        title={'Vendors'}
        columns={vendorColumns}
        service={{
          getAll: vendorsService.getAll,
        }}
      />

      <DebugCard
        title={'Storages'}
        columns={storageColumns}
        service={{
          getAll: storagesService.getAll,
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
