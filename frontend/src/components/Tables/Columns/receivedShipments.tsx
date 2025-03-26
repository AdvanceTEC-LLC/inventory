import { GridColDef } from '@mui/x-data-grid'
import { ReceivedShipmentType } from '../../../types/receivedShipment'

export const id: GridColDef = {
  field: 'id',
  headerName: 'ID',
  flex: 1,
  valueGetter: (_value, row: ReceivedShipmentType) => row.id,
}

export const trackingNumber: GridColDef = {
  field: 'trackingNumber',
  headerName: 'Tracking Number',
  flex: 1,
  valueGetter: (_value, row: ReceivedShipmentType) => row.trackingNumber,
}

export const orderAcknowledgement: GridColDef = {
  field: 'orderAcknowledgement',
  headerName: 'Order Acknowledgement',
  flex: 1,
  valueGetter: (_value, row: ReceivedShipmentType) => row.orderAcknowledgement,
}

export const purchaseOrder: GridColDef = {
  field: 'purchaseOrder',
  headerName: 'Purchase Order',
  flex: 1,
  valueGetter: (_value, row: ReceivedShipmentType) => row.purchaseOrder,
}

export const salesOrder: GridColDef = {
  field: 'salesOrder',
  headerName: 'Sales Order',
  flex: 1,
  valueGetter: (_value, row: ReceivedShipmentType) => row.salesOrder,
}

export const project: GridColDef = {
  field: 'project',
  headerName: 'Project',
  flex: 2,
  valueGetter: (_value, row: ReceivedShipmentType) => {
    return `${row.project.number} ${row.project.name}`
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
  flex: 1,
  valueGetter: (_value, row: ReceivedShipmentType) =>
    new Date(row.receivedDate).toDateString(),
}

export const columns: GridColDef[] = [trackingNumber, project]
