import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  {
    field: 'partNumber',
    headerName: 'Part Number',
    flex: 1,
    valueGetter: (_value, row) => row.material.partNumber,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    valueGetter: (_value, row) => row.material.description,
  },
  {
    field: 'vendor',
    headerName: 'Vendor',
    flex: 1,
    valueGetter: (_value, row) => row.material.vendor.name,
  },
  {
    field: 'color',
    headerName: 'Color',
    flex: 1,
    valueGetter: (_value, row) => row.material.color,
  },
  {
    field: 'tag',
    headerName: 'Tag',
    flex: 1,
    valueGetter: (_value, row) => row.material.tag,
  },
  {
    field: 'size',
    headerName: 'Size',
    flex: 1,
    valueGetter: (_value, row) => {
      if (
        row.material.thicknessInches &&
        row.material.widthInches &&
        row.material.lengthInches
      )
        return `${row.material.thicknessInches}"T x ${row.material.widthInches}"W x ${row.material.lengthInches}"L`
    },
  },
  {
    field: 'squareFeet',
    headerName: 'Square Feet',
    flex: 1,
    valueGetter: (_value, row) => {
      if (row.material.squareFeet) return `${row.material.squareFeet}'`
    },
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    flex: 1,
    valueGetter: (_value, row) => row.quantity,
  },
]
