import {
  GridRowSelectionModel,
  GridColDef,
  GridRenderCellParams,
  DataGrid,
} from '@mui/x-data-grid'
import { Dispatch, SetStateAction } from 'react'
import { CrateType } from '../../../types/crate'
import { project as projectColumn } from '../../Tables/Columns/assemblies'
import { location, number, opened } from '../../Tables/Columns/crates'
import { paginationModel, pageSizeOptions } from '../../Tables/pagination'
import CrateContents from './CrateContents'
import { useCrates } from '../../../hooks/useCratesHook'
import { useProject } from '../Projects/ProjectContext'

interface CratesTableProps {
  setSelectedCrates: Dispatch<SetStateAction<CrateType[]>>
}

const CratesTable = ({ setSelectedCrates }: CratesTableProps) => {
  const { project } = useProject()

  const { data: crates = [] } = useCrates()

  const filteredCrates = crates.filter((crate) =>
    !project ? true : crate.project.id === project.id
  )

  const handleRowSelection = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedIDs = new Set(rowSelectionModel)
    const selectedCrates = crates.filter((crate) => selectedIDs.has(crate.id))
    setSelectedCrates(selectedCrates)
  }

  const actions: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridRenderCellParams<CrateType>) => (
      <CrateContents crate={params.row} />
    ),
  }

  const columns: GridColDef[] = [number, location, opened]

  return (
    <DataGrid
      sx={{ border: 0 }}
      rows={filteredCrates}
      columns={
        project ? [...columns, actions] : [...columns, projectColumn, actions]
      }
      onRowSelectionModelChange={(rowSelectionModel) => {
        handleRowSelection(rowSelectionModel)
      }}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
      checkboxSelection
    />
  )
}

export default CratesTable
