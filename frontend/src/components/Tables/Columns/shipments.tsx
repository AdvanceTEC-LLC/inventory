import { GridColDef } from '@mui/x-data-grid'
import { ShipmentType } from '../../../types/shipment'

export const trackingNumber: GridColDef = {
  field: 'trackingNumber',
  headerName: 'Tracking Number',
  flex: 1,
  valueGetter: (_value, row: ShipmentType) => row.trackingNumber,
}

export const project: GridColDef = {
  field: 'project',
  headerName: 'Project',
  flex: 3,
  valueGetter: (_value, row: ShipmentType) => {
    return `${row.project.number} ${row.project.name}`
  },
}

export const columns: GridColDef[] = [trackingNumber, project]
