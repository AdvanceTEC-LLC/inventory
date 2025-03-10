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
  flex: 2,
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

export const receivedDate: GridColDef = {
  field: 'receivedDate',
  headerName: 'Received Date',
  flex: 2,
  valueGetter: (_value, row: ReceivedShipmentType) =>
    new Date(row.receivedDate).toDateString(),
}

export const columns: GridColDef[] = [trackingNumber, project]
