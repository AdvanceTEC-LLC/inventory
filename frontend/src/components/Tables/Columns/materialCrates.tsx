import { GridColDef } from '@mui/x-data-grid'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { MaterialCrateType } from '../../../types/materialCrate'

export const number: GridColDef = {
  field: 'number',
  headerName: 'Number',
  flex: 1,
  valueGetter: (_value, row: MaterialCrateType) => row.crate.number,
}

export const crateLocation: GridColDef = {
  field: 'crateLocation',
  headerName: 'Crate Location',
  flex: 1,
  valueGetter: (_value, row: MaterialCrateType) => row.crate.crateLocation.name,
}

export const shelfLocation: GridColDef = {
  field: 'shelfLocation',
  headerName: 'Shelf Location',
  flex: 1,
  valueGetter: (_value, row: MaterialCrateType) => {
    if (!row.crate.shelfLocation) return ''
    const { side, aisle, col, shelf } = row.crate.shelfLocation
    return `Side ${side} Aisle ${aisle} ${col}x${shelf}`
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
  valueGetter: (_value, row: MaterialCrateType) => {
    if (row.crate.shelfLocation) {
      const { side, aisle, col, shelf } = row.crate.shelfLocation
      return `Side ${side} Aisle ${aisle} ${col}x${shelf}`
    } else {
      return row.crate.crateLocation.name
    }
  },
}

export const project: GridColDef = {
  field: 'project',
  headerName: 'Project',
  flex: 1,
  valueGetter: (_value, row: MaterialCrateType) => {
    return `${row.crate.project.number} ${row.crate.project.name}`
  },
}

export const columns: GridColDef[] = [number, location, opened, project]
