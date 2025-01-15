import { Autocomplete, TextField } from '@mui/material'
import { AssemblyType } from '../../../types/assembly'
import Container from '../../ATEC UI/Container'
import { Header, Subtitle, Title } from '../../ATEC UI/Text'
import { SyntheticEvent, useState } from 'react'
import { ProjectType } from '../../../types/project'
import { DataGrid } from '@mui/x-data-grid'

import { GridColDef } from '@mui/x-data-grid'
import Button from '../../ATEC UI/Button'
import { useQuery } from '@tanstack/react-query'
import projectsService from '../../../services/projectsService'
import assembliesService from '../../../services/assembliesService'

export const billOfMaterialsColumns: GridColDef[] = [
  {
    field: 'partNumber',
    headerName: 'Part Number',
    flex: 1,
    valueGetter: (_value, row) => row.material.partNumber,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    valueGetter: (_value, row) => row.material.description,
  },
  {
    field: 'size',
    headerName: 'Size',
    flex: 1,
    valueGetter: (_value, row) => {
      const dimensions = ['thickness', 'width', 'length']
        .map((key) =>
          row.material[key]
            ? `${row.material[key]}"${key[0].toUpperCase()}`
            : undefined
        )
        .filter(Boolean)

      return dimensions.join(' x ')
    },
  },
  {
    field: 'tag',
    headerName: 'Tag',
    flex: 1,
    valueGetter: (_value, row) => row.material.tag,
  },
  {
    field: 'vendor',
    headerName: 'Vendor',
    flex: 1,
    valueGetter: (_value, row) => row.material.vendor.name,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    flex: 1,
    valueGetter: (_value, row) => row.quantity,
  },
]

const paginationModel = { page: 0, pageSize: 5 }

const Prefabricate = () => {
  const [project, setProject] = useState<ProjectType | null>(null)
  const [assembly, setAssembly] = useState<AssemblyType | null>(null)

  const {
    data: projects = [],
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useQuery<ProjectType[]>({
    queryKey: ['projects'],
    queryFn: projectsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const {
    data: assemblies = [],
    isLoading: isAssembliesLoading,
    isError: isAssembliesError,
  } = useQuery<AssemblyType[]>({
    queryKey: ['assemblies'],
    queryFn: assembliesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const handleProjectChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: ProjectType | null
  ) => {
    setProject(newValue)
  }

  const handleAssemblyChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: AssemblyType | null
  ) => {
    setAssembly(newValue)
  }

  const createAssembly = () => {
    console.log(`Creating assembly ${assembly?.identifier}`)
  }

  return (
    <Container>
      <Title text={'Prefabricate'} />
      <Subtitle text="Create assemblies from materials in inventory" />

      <Autocomplete
        fullWidth
        options={projects}
        getOptionLabel={(option) => `${option.number} ${option.name}` || ''}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={project}
        onChange={handleProjectChange}
        renderInput={(params) => <TextField {...params} label="Project" />}
        noOptionsText={
          isProjectsLoading
            ? 'Loading'
            : isProjectsError
            ? 'Error'
            : 'No projects available'
        }
      />

      {project && (
        <>
          <Autocomplete
            fullWidth
            options={assemblies}
            getOptionLabel={(option) => option.identifier || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={assembly}
            onChange={handleAssemblyChange}
            renderInput={(params) => <TextField {...params} label="Assembly" />}
            noOptionsText={
              isAssembliesLoading
                ? 'Loading'
                : isAssembliesError
                ? 'Error'
                : 'No assemblies available'
            }
          />

          <Header className="mt-8" text="Bill Of Materials" />

          <DataGrid
            rows={assembly?.billOfMaterials}
            columns={billOfMaterialsColumns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            disableRowSelectionOnClick
          />

          <Button
            text="Create Assembly"
            onClick={createAssembly}
            disabled={assembly === null}
          />
        </>
      )}
    </Container>
  )
}

export default Prefabricate
