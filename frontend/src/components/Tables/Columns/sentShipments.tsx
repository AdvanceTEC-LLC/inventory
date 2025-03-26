import { GridColDef } from '@mui/x-data-grid'
import { SentShipmentType } from '../../../types/sentShipment'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

export const transmittal: GridColDef = {
  field: 'transmittal',
  headerName: 'Transmittal',
  flex: 1,
  valueGetter: (_value, row: SentShipmentType) => row.transmittal,
}

export const project: GridColDef = {
  field: 'project',
  headerName: 'Project',
  flex: 2,
  valueGetter: (_value, row: SentShipmentType) => {
    return `${row.project.number} ${row.project.name}`
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
  flex: 1,
  valueGetter: (_value, row: SentShipmentType) =>
    new Date(row.sendDate).toDateString(),
}

export const columns: GridColDef[] = [transmittal, project]
