import { GridColDef, GridRenderCellParams, DataGrid } from '@mui/x-data-grid'
import { AssemblyCrateType } from '../../../types/assemblyCrate'
import { number } from '../../Tables/Columns/assemblyCrates'
import { paginationModel, pageSizeOptions } from '../../Tables/pagination'
import { useProject } from '../../Projects/Projects/ProjectContext'
import { useStagingAreas } from '../../../hooks/useStagingAreas'
import { useAssemblyCrates } from '../../../hooks/useAssemblyCratesHook'
import { useEffect } from 'react'
import OutgoingCrateContents from './OutgoingCrateContents'
import { useFormContext } from 'react-hook-form'
import { SentShipmentType } from './types'

const OutgoingCratesTable = () => {
  const { project } = useProject()
  const { setValue, watch } = useFormContext<SentShipmentType>()
  const { data: stagingAreas = [] } = useStagingAreas()
  const { data: assemblyCrates = [] } = useAssemblyCrates()

  useEffect(() => {
    if (!project) return

    const stagingArea = stagingAreas.find(
      (stagingArea) => stagingArea.project?.id === project.id
    )

    const stagedCrates = assemblyCrates.filter((assemblyCrate) =>
      !stagingArea ? false : assemblyCrate.stagingArea?.id === stagingArea.id
    )

    setValue('assemblyCrates', stagedCrates)
  }, [project, stagingAreas, assemblyCrates, setValue])

  const columns: GridColDef[] = [
    number,
    {
      field: 'contents',
      headerName: 'Contents',
      flex: 1,
      renderCell: (params: GridRenderCellParams<AssemblyCrateType>) => (
        <OutgoingCrateContents assemblyCrate={params.row} />
      ),
    },
  ]

  const assemblyCratesList = watch('assemblyCrates')

  return (
    <DataGrid
      sx={{
        border: 0,
      }}
      rows={assemblyCratesList}
      columns={columns}
      paginationModel={paginationModel}
      pageSizeOptions={pageSizeOptions}
      disableRowSelectionOnClick
    />
  )
}

export default OutgoingCratesTable
