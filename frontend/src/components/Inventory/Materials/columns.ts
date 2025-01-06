import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  {
    field: 'partNumber',
    headerName: 'Part Number',
    flex: 1,
    valueGetter: (_value, row) => row.partNumber,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    valueGetter: (_value, row) => row.description,
  },
  {
    field: 'vendor',
    headerName: 'Vendor',
    flex: 1,
    valueGetter: (_value, row) => row.vendor.name,
  },
  {
    field: 'color',
    headerName: 'Color',
    flex: 1,
    valueGetter: (_value, row) => row.color,
  },
  {
    field: 'tag',
    headerName: 'Tag',
    flex: 1,
    valueGetter: (_value, row) => row.tag,
  },
  {
    field: 'size',
    headerName: 'Size',
    flex: 1,
    valueGetter: (_value, row) => {
      if (row.thicknessInches && row.widthInches && row.lengthInches)
        return `${row.thicknessInches}"T x ${row.widthInches}"W x ${row.lengthInches}"L`
    },
  },
  {
    field: 'squareFeet',
    headerName: 'Square Feet',
    flex: 1,
    valueGetter: (_value, row) => {
      if (row.squareFeet) return `${row.squareFeet}'`
    },
  },
]
