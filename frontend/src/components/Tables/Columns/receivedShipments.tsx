import { GridColDef } from '@mui/x-data-grid'
import { ReceivedShipmentType } from '../../../types/receivedShipment'

export const trackingNumber: GridColDef = {
  field: 'trackingNumber',
  headerName: 'Tracking Number',
  flex: 1,
  valueGetter: (_value, row: ReceivedShipmentType) =>
    row.shipment.trackingNumber,
}

export const project: GridColDef = {
  field: 'project',
  headerName: 'Project',
  flex: 3,
  valueGetter: (_value, row: ReceivedShipmentType) => {
    return `${row.shipment.project.number} ${row.shipment.project.name}`
  },
}

export const manufacturer: GridColDef = {
  field: 'manufacturer',
  headerName: 'Manufacturer',
  flex: 1,
  valueGetter: (_value, row: ReceivedShipmentType) => row.manufacturer.name,
}

export const columns: GridColDef[] = [trackingNumber, project]
