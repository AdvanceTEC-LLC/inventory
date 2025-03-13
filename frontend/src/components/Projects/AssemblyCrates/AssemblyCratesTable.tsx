import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from '@mui/x-data-grid'
import { paginationModel, pageSizeOptions } from '../../Tables/pagination'
import { useAssemblyCrates } from '../../../hooks/useAssemblyCratesHook'
import { useProject } from '../Projects/ProjectContext'
import {
  location,
  number,
  project as projectColumn,
  status,
} from '../../Tables/Columns/assemblyCrates'
import { AssemblyCrateType } from '../../../types/assemblyCrate'
import AssemblyCrateContents from './AssemblyCrateContents'
import { useSelectedAssemblyCrates } from './SelectedAssemblyCratesContext'

const AssemblyCratesTable = () => {
  const { project } = useProject()

  const { setSelectedAssemblyCrates } = useSelectedAssemblyCrates()

  const handleRowSelection = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedIDs = new Set(rowSelectionModel)
    const selectedCrates = assemblyCrates.filter((crate) =>
      selectedIDs.has(crate.id)
    )
    setSelectedAssemblyCrates(selectedCrates)
  }

  const { data: assemblyCrates = [] } = useAssemblyCrates()

  const filteredAssemblyCrates = assemblyCrates.filter((assemblyCrate) =>
    !project ? true : assemblyCrate.crate.project.id === project.id
  )

  const actions: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridRenderCellParams<AssemblyCrateType>) => (
      <AssemblyCrateContents assemblyCrate={params.row} />
    ),
  }

  const columns: GridColDef[] = project
    ? [number, location, status, actions]
    : [number, location, status, projectColumn, actions]

  return (
    <DataGrid
      rows={filteredAssemblyCrates}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
      sx={{ border: 0 }}
      onRowSelectionModelChange={(rowSelectionModel) => {
        handleRowSelection(rowSelectionModel)
      }}
      checkboxSelection
    />
  )
}

export default AssemblyCratesTable
