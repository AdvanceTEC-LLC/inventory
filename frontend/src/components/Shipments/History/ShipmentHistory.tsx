import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useShipments } from '../../../hooks/useShipments'
import { paginationModel, pageSizeOptions } from '../../Tables/pagination'
import {
  project as projectColumn,
  trackingNumber,
} from '../../Tables/Columns/shipments'
import { useProject } from '../../Projects/Projects/ProjectContext'
import ShipmentCrates from './ShipmentCrates'
import { ShipmentType } from '../../../types/shipment'

const ShipmentHistory = () => {
  const { data: shipments = [] } = useShipments()
  const { project } = useProject()

  const filteredShipments = shipments.filter((shipment) =>
    !project ? true : shipment.project.id === project.id
  )

  const actions: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridRenderCellParams<ShipmentType>) => (
      <ShipmentCrates shipment={params.row} />
    ),
  }

  const columns: GridColDef[] = [trackingNumber]

  return (
    <DataGrid
      sx={{ border: 0 }}
      rows={filteredShipments}
      columns={
        project ? [...columns, actions] : [...columns, projectColumn, actions]
      }
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
    />
  )
}

export default ShipmentHistory
