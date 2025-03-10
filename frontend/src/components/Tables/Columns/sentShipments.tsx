import { GridColDef } from '@mui/x-data-grid'
import { SentShipmentType } from '../../../types/sentShipment'

export const trackingNumber: GridColDef = {
  field: 'trackingNumber',
  headerName: 'Tracking Number',
  flex: 1,
  valueGetter: (_value, row: SentShipmentType) => row.shipment.trackingNumber,
}

export const project: GridColDef = {
  field: 'project',
  headerName: 'Project',
  flex: 3,
  valueGetter: (_value, row: SentShipmentType) => {
    return `${row.shipment.project.number} ${row.shipment.project.name}`
  },
}

export const columns: GridColDef[] = [trackingNumber, project]
