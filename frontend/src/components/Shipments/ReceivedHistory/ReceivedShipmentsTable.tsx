import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { paginationModel, pageSizeOptions } from '../../Tables/pagination'
import {
  id,
  manufacturer,
  orderAcknowledgement,
  project as projectColumn,
  purchaseOrder,
  receivedDate,
  salesOrder,
  trackingNumber,
} from '../../Tables/Columns/receivedShipments'
import { useProject } from '../../Projects/Projects/ProjectContext'
import { ReceivedShipmentType } from '../../../types/receivedShipment'
import { useReceivedShipments } from '../../../hooks/useReceivedShipmentsHook'
import ReceivedShipmentMaterialCrates from './ReceivedShipmentMaterialCrates'

const ReceivedShipmentsTable = () => {
  const { data: receivedShipments = [] } = useReceivedShipments()
  const { project } = useProject()

  const filteredReceivedShipments = receivedShipments.filter(
    (receivedShipments) =>
      !project ? true : receivedShipments.project.id === project.id
  )

  const actions: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridRenderCellParams<ReceivedShipmentType>) => (
      <ReceivedShipmentMaterialCrates receivedShipment={params.row} />
    ),
  }

  const columns: GridColDef[] = project
    ? [
        id,
        trackingNumber,
        orderAcknowledgement,
        purchaseOrder,
        salesOrder,
        manufacturer,
        receivedDate,
        actions,
      ]
    : [
        id,
        trackingNumber,
        orderAcknowledgement,
        purchaseOrder,
        salesOrder,
        projectColumn,
        manufacturer,
        receivedDate,
        actions,
      ]

  return (
    <DataGrid
      sx={{ border: 0 }}
      rows={filteredReceivedShipments}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
    />
  )
}

export default ReceivedShipmentsTable
