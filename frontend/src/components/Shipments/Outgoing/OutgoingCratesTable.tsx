import { GridColDef, GridRenderCellParams, DataGrid } from '@mui/x-data-grid'
import { AssemblyCrateType } from '../../../types/assemblyCrate'
import { number } from '../../Tables/Columns/assemblyCrates'
import { paginationModel, pageSizeOptions } from '../../Tables/pagination'
import { useProject } from '../../Projects/Projects/ProjectContext'
import { useStagingAreas } from '../../../hooks/useStagingAreas'
import { useAssemblyCrates } from '../../../hooks/useAssemblyCratesHook'
import { useEffect } from 'react'
import OutgoingCrateContents from './OutgoingCrateContents'
import { useSentShipment } from './SentShipmentContext'

const OutgoingCratesTable = () => {
  const { project } = useProject()
  const { sentShipment, setSentShipment } = useSentShipment()
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

    setSentShipment({
      ...sentShipment,
      assemblyCrates: stagedCrates,
    })
  }, [project, stagingAreas, assemblyCrates])

  const actions: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridRenderCellParams<AssemblyCrateType>) => (
      <OutgoingCrateContents assemblyCrate={params.row} />
    ),
  }

  const columns: GridColDef[] = [number, actions]

  return (
    <DataGrid
      rows={sentShipment?.assemblyCrates}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
    />
  )
}

export default OutgoingCratesTable
