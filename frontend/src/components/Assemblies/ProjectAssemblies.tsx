import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useAssemblies } from '../../hooks/useAssembliesHook'
import { ProjectType } from '../../types/project'
import { code, prefabricated } from '../Tables/Columns/assemblies'
import { paginationModel, pageSizeOptions } from '../Tables/pagination'
import BillOfMaterials from './BillOfMaterials'

const ProjectAssemblies = ({ project }: { project: ProjectType | null }) => {
  const { data: assemblies = [] } = useAssemblies()

  const filteredAssemblies = assemblies.filter(
    (assembly) => assembly.project.id === project?.id
  )

  const columns: GridColDef[] = [
    code,
    prefabricated,
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => <BillOfMaterials assembly={params.row} />,
    },
  ]

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

export default ProjectAssemblies
