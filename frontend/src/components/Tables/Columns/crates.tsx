import { GridColDef } from '@mui/x-data-grid'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { CrateType } from '../../../types/crate'

export const number: GridColDef = {
  field: 'number',
  headerName: 'Number',
  flex: 1,
  valueGetter: (value) => value,
}

export const warehouseLocation: GridColDef = {
  field: 'warehouseLocation',
  headerName: 'Warehouse Location',
  flex: 1,
  valueGetter: (_value, row: CrateType) => row.warehouseLocation.name,
}

export const shelfLocation: GridColDef = {
  field: 'shelfLocation',
  headerName: 'Shelf Location',
  flex: 1,
  valueGetter: (_value, row: CrateType) => {
    if (!row.shelfLocation) return ''
    const { side, aisle, col, shelf } = row.shelfLocation
    return `Side ${side} Aisle ${aisle} ${col}x${shelf}`
  },
}
export const stagingArea: GridColDef = {
  field: 'stagingArea',
  headerName: 'Staging Area',
  flex: 1,
  valueGetter: (_value, row: CrateType) => {
    if (!row.stagingArea) return ''
    return row.stagingArea.name
  },
}

export const opened: GridColDef = {
  field: 'opened',
  headerName: 'Opened',
  flex: 1,
  renderCell: (params) => {
    return params.value ? <CheckIcon /> : <ClearIcon color="disabled" />
  },
}

export const location: GridColDef = {
  field: 'location',
  headerName: 'Location',
  flex: 1,
  valueGetter: (_value, row: CrateType) => {
    if (row.stagingArea) {
      return row.stagingArea.name
    } else if (row.shelfLocation) {
      const { side, aisle, col, shelf } = row.shelfLocation
      return `Side ${side} Aisle ${aisle} ${col}x${shelf}`
    } else {
      return row.warehouseLocation.name
    }
  },
}

export const project: GridColDef = {
  field: 'project',
  headerName: 'Project',
  flex: 1,
  valueGetter: (_value, row: CrateType) => {
    return `${row.project.number} ${row.project.name}`
  },
}

export const columns: GridColDef[] = [number, location, opened, project]
