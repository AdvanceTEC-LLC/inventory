import { GridColDef } from '@mui/x-data-grid'
import { AssemblyCrateType } from '../../../types/assemblyCrate'

export const number: GridColDef = {
  field: 'number',
  headerName: 'Number',
  flex: 1,
  valueGetter: (_value, row: AssemblyCrateType) => row.crate.number,
}

export const crateLocation: GridColDef = {
  field: 'crateLocation',
  headerName: 'Crate Location',
  flex: 1,
  valueGetter: (_value, row: AssemblyCrateType) => row.crate.crateLocation.name,
}

export const shelfLocation: GridColDef = {
  field: 'shelfLocation',
  headerName: 'Shelf Location',
  flex: 1,
  valueGetter: (_value, row: AssemblyCrateType) => {
    if (!row.crate.shelfLocation) return ''
    const { side, aisle, col, shelf } = row.crate.shelfLocation
    return `Side ${side} Aisle ${aisle} ${col}x${shelf}`
  },
}

export const stagingArea: GridColDef = {
  field: 'stagingArea',
  headerName: 'Staging Area',
  flex: 1,
  valueGetter: (_value, row: AssemblyCrateType) => {
    if (!row.stagingArea) return ''
    return row.stagingArea.name
  },
}

export const location: GridColDef = {
  field: 'location',
  headerName: 'Location',
  flex: 1,
  valueGetter: (_value, row: AssemblyCrateType) => {
    if (row.stagingArea) {
      return row.stagingArea.name
    } else if (row.crate.shelfLocation) {
      const { side, aisle, col, shelf } = row.crate.shelfLocation
      return `Side ${side} Aisle ${aisle} ${col}x${shelf}`
    } else {
      return row.crate.crateLocation.name
    }
  },
}

export const status: GridColDef = {
  field: 'status',
  headerName: 'Status',
  flex: 1,
  valueGetter: (_value, row: AssemblyCrateType) => {
    if (row.assemblies.length <= 0) return 'Empty'
    if (row.assemblies.every((assembly) => assembly.prefabricated))
      return 'Holding'
    if (row.assemblies.every((assembly) => !assembly.prefabricated))
      return 'Pending'
    if (row.assemblies.some((assembly) => !assembly.prefabricated))
      return 'In Progress'
  },
}

export const project: GridColDef = {
  field: 'project',
  headerName: 'Project',
  flex: 1,
  valueGetter: (_value, row: AssemblyCrateType) => {
    return `${row.crate.project.number} ${row.crate.project.name}`
  },
}

export const columns: GridColDef[] = [number, location, status, project]
