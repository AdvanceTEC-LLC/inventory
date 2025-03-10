import { GridColDef } from '@mui/x-data-grid'
import { SentShipmentType } from '../../../types/sentShipment'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

export const trackingNumber: GridColDef = {
  field: 'trackingNumber',
  headerName: 'Tracking Number',
  flex: 1,
  valueGetter: (_value, row: SentShipmentType) => row.shipment.trackingNumber,
}

export const project: GridColDef = {
  field: 'project',
  headerName: 'Project',
  flex: 2,
  valueGetter: (_value, row: SentShipmentType) => {
    return `${row.shipment.project.number} ${row.shipment.project.name}`
  },
}

export const delivered: GridColDef = {
  field: 'delivered',
  headerName: 'Delivered',
  flex: 1,
  renderCell: (params) => {
    return params.value ? <CheckIcon /> : <ClearIcon color="disabled" />
  },
}

export const sendDate: GridColDef = {
  field: 'sendDate',
  headerName: 'Send Date',
  flex: 2,
  valueGetter: (_value, row: SentShipmentType) =>
    new Date(row.sendDate).toDateString(),
}

export const columns: GridColDef[] = [trackingNumber, project]
