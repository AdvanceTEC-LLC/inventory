import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { paginationModel, pageSizeOptions } from '../../Tables/pagination'
import {
  delivered,
  project as projectColumn,
  sendDate,
  trackingNumber,
} from '../../Tables/Columns/sentShipments'
import { useProject } from '../../Projects/Projects/ProjectContext'
import { SentShipmentType } from '../../../types/sentShipment'
import { useSentShipments } from '../../../hooks/useSentShipmentsHook'
import SentShipmentMaterialCrates from './SentShipmentAssemblyCrates'

const SentShipmentsTable = () => {
  const { data: sentShipments = [] } = useSentShipments()
  const { project } = useProject()

  const filteredSentShipments = sentShipments.filter((sentShipments) =>
    !project ? true : sentShipments.shipment.project.id === project.id
  )

  const actions: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridRenderCellParams<SentShipmentType>) => (
      <SentShipmentMaterialCrates sentShipment={params.row} />
    ),
  }

  const columns: GridColDef[] = project
    ? [trackingNumber, delivered, sendDate, actions]
    : [trackingNumber, projectColumn, delivered, sendDate, actions]

  return (
    <DataGrid
      sx={{ border: 0 }}
      rows={filteredSentShipments}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
    />
  )
}

export default SentShipmentsTable
