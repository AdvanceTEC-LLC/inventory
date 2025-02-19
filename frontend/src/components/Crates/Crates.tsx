import { useState } from 'react'
import Container from '../ATEC UI/Container'
import { Title } from '../ATEC UI/Text'
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import cratesService from '../../services/cratesService'
import { location, number, opened, project } from '../Tables/Columns/crates'
import { CrateType } from '../../types/crate'
import RelocateCrates from './RelocateCrates'
import CrateContents from './CrateContents'
import { pageSizeOptions, paginationModel } from '../Tables/pagination'

const Crates = () => {
  const [selectedCrates, setSelectedCrates] = useState<CrateType[]>([])

  const { data: crates = [] } = useQuery({
    queryKey: ['crates'],
    queryFn: cratesService.getAll,
    staleTime: 1000 * 60 * 5,
  })

  const handleRowSelection = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedIDs = new Set(rowSelectionModel)
    const selectedCrates = crates.filter((crate) => selectedIDs.has(crate.id))
    setSelectedCrates(selectedCrates)
  }

  const columns: GridColDef[] = [
    number,
    location,
    opened,
    project,
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => <CrateContents crate={params.row} />,
    },
  ]

  return (
    <Container className="overflow-x-auto">
      <Title text={'Crates'} />

      <DataGrid
        sx={{ border: 0 }}
        rows={crates}
        columns={columns}
        onRowSelectionModelChange={(rowSelectionModel) =>
          handleRowSelection(rowSelectionModel)
        }
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection
      />

      <RelocateCrates crates={selectedCrates} />
    </Container>
  )
}

export default Crates
