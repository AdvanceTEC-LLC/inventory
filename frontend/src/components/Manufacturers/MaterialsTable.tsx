import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMaterials } from '../../hooks/useMaterialsHook'
import {
  name,
  unit,
  manufacturer as manufacturerColumn,
} from '../Tables/Columns/materials'
import { paginationModel, pageSizeOptions } from '../Tables/pagination'
import { useManufacturer } from './ManufacturerContext'

const MaterialsTable = () => {
  const { manufacturer } = useManufacturer()

  const { data: materials = [] } = useMaterials()

  const filteredMaterials = materials.filter((material) =>
    !manufacturer ? true : material.manufacturer.id === manufacturer.id
  )

  const columns: GridColDef[] = manufacturer
    ? [name, unit]
    : [name, manufacturerColumn, unit]

  return (
    <DataGrid
      rows={filteredMaterials}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
    />
  )
}

export default MaterialsTable
