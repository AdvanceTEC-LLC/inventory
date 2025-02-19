import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMaterials } from '../../hooks/useMaterialsHook'
import { ManufacturerType } from '../../types/manufacturer'
import { name, unit } from '../Tables/Columns/materials'
import { paginationModel, pageSizeOptions } from '../Tables/pagination'

const ManufacturerMaterials = ({
  selectedManufacturer,
}: {
  selectedManufacturer: ManufacturerType | null
}) => {
  const { data: materials = [] } = useMaterials()

  const filteredMaterials = materials.filter(
    (material) => material.manufacturer.id === selectedManufacturer?.id
  )

  const columns: GridColDef[] = [name, unit]

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

export default ManufacturerMaterials
