import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridToolbar,
} from '@mui/x-data-grid'
import Container from '../../ATEC UI/Container'
import { Subtitle, Title } from '../../ATEC UI/Text'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { ProjectType } from '../../../types/project'
import { useQuery } from '@tanstack/react-query'
import assembliesService from '../../../services/assembliesService'
import { AssemblyType } from '../../../types/assembly'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'

export const assemblyColumns: GridColDef[] = [
  {
    field: 'identifier',
    headerName: 'Identifier',
    flex: 1,
    valueGetter: (_value, row) => row.identifier,
  },
]

const paginationModel = { page: 0, pageSize: 5 }

const WorkPackages = () => {
  const project: ProjectType | null = useSelector(
    (state: RootState) => state.project as ProjectType | null
  )

  const [workPackage, setWorkPackage] = useState<{
    number: string
    assemblies: AssemblyType[]
  }>({
    number: '',
    assemblies: [],
  })

  const { data: assemblies = [] } = useQuery<AssemblyType[]>({
    queryKey: ['assemblies'],
    queryFn: assembliesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const handleRowSelection = (selectedIds: (string | number)[]) => {
    const selectedAssemblies = assemblies.filter((assembly) =>
      selectedIds.includes(assembly.id)
    )

    setWorkPackage((prev) => ({
      ...prev,
      assemblies: selectedAssemblies,
    }))
  }

  const isValidWorkPackage = (workPackage: {
    number: string
    assemblies: AssemblyType[]
  }) => {
    if (!workPackage.number || workPackage.assemblies.length == 0) return false
    return true
  }

  return (
    <Container>
      <Title text={'Work Packages'} />
      <Subtitle text="Group assemblies into work packages" />

      <TextField
        id="outlined-basic"
        label="New work package number"
        variant="outlined"
        onChange={(e) =>
          setWorkPackage({ ...workPackage, number: e.target.value })
        }
      />

      <DataGrid
        rows={
          project
            ? assemblies.filter(
                (assembly) => assembly.project.number === project.number
              )
            : assemblies
        }
        columns={assemblyColumns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        disableRowSelectionOnClick
        checkboxSelection
        slots={{ toolbar: GridToolbar }}
        onRowSelectionModelChange={(
          rowSelectionModel: GridRowSelectionModel
        ) => {
          const selectedIds = rowSelectionModel as (string | number)[]
          handleRowSelection(selectedIds)
        }}
      />

      <Button
        variant="contained"
        disabled={!isValidWorkPackage(workPackage)}
        onClick={() => {
          console.log('Creating Work Package', workPackage)
        }}
      >
        Create Work Package
      </Button>
    </Container>
  )
}

export default WorkPackages
