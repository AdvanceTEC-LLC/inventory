import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useAssemblies } from '../../../hooks/useAssembliesHook'
import {
  code,
  prefabricated,
  project as projectColumn,
} from '../../Tables/Columns/assemblies'
import { paginationModel, pageSizeOptions } from '../../Tables/pagination'
import BillOfMaterials from './BillOfMaterials'
import { AssemblyType } from '../../../types/assembly'
import { useProject } from '../Projects/ProjectContext'

const AssembliesTable = () => {
  const { project } = useProject()

  const { data: assemblies = [] } = useAssemblies()

  const filteredAssemblies = assemblies.filter((assembly) =>
    !project ? true : assembly.project.id === project.id
  )

  const actions: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    renderCell: (params: GridRenderCellParams<AssemblyType>) => (
      <BillOfMaterials assembly={params.row} />
    ),
  }

  const columns: GridColDef[] = project
    ? [code, prefabricated, actions]
    : [code, projectColumn, prefabricated, actions]

  return (
    <DataGrid
      rows={filteredAssemblies}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
    />
  )
}

export default AssembliesTable
