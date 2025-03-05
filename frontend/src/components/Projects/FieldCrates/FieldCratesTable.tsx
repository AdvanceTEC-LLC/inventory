import { DataGrid, GridColDef } from '@mui/x-data-grid'
//import { useFieldCrates } from '../../../hooks/useFieldCratesHook'
import { paginationModel, pageSizeOptions } from '../../Tables/pagination'
//import { useProject } from '../../Projects/ProjectContext'

const FieldCratesTable = () => {
  /* 
  const { project } = useProject()

  const { data: fieldCrates = [] } = useFieldCrates()

  const filteredFieldCrates = fieldCrates.filter(
    (assembly) => assembly.project.id === project?.id
  )
  */

  const columns: GridColDef[] = []

  return (
    <DataGrid
      rows={/*filteredFieldCrates*/ []}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
    />
  )
}

export default FieldCratesTable
