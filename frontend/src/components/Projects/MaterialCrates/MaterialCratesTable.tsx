import {
  GridRowSelectionModel,
  GridColDef,
  DataGrid,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import { Dispatch, SetStateAction } from 'react'
import { paginationModel, pageSizeOptions } from '../../Tables/pagination'
import { useMaterialCrates } from '../../../hooks/useMaterialCratesHook'
import { useProject } from '../Projects/ProjectContext'
import { MaterialCrateType } from '../../../types/materialCrate'
import {
  location,
  number,
  opened,
  project as projectColumn,
} from '../../Tables/Columns/materialCrates'
import MaterialCrateContents from './MaterialCrateContents'

interface MaterialCratesTableProps {
  setSelectedCrates: Dispatch<SetStateAction<MaterialCrateType[]>>
}

const MaterialCratesTable = ({
  setSelectedCrates,
}: MaterialCratesTableProps) => {
  const { project } = useProject()

  const { data: materialCrates = [] } = useMaterialCrates()

  const filteredCrates = materialCrates.filter((materialCrate) =>
    !project ? true : materialCrate.crate.project.id === project.id
  )

  const handleRowSelection = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedIDs = new Set(rowSelectionModel)
    const selectedCrates = materialCrates.filter((crate) =>
      selectedIDs.has(crate.id)
    )
    setSelectedCrates(selectedCrates)
  }

  const actions: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridRenderCellParams<MaterialCrateType>) => (
      <MaterialCrateContents materialCrate={params.row} />
    ),
  }

  const columns: GridColDef[] = project
    ? [number, location, opened, actions]
    : [number, location, opened, projectColumn, actions]

  return (
    <DataGrid
      sx={{ border: 0 }}
      rows={filteredCrates}
      columns={columns}
      onRowSelectionModelChange={(rowSelectionModel) => {
        handleRowSelection(rowSelectionModel)
      }}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
      checkboxSelection
    />
  )
}

export default MaterialCratesTable
