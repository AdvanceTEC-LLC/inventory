import { Autocomplete, TextField } from '@mui/material'
import { AssemblyType } from '../../../types/assembly'
import Container from '../../ATEC UI/Container'
import { Header, Subtitle, Title } from '../../ATEC UI/Text'
import { SyntheticEvent, useState } from 'react'
import { MaterialType } from '../../../types/material'
import { VendorType } from '../../../types/vendor'
import { ProjectType } from '../../../types/project'
import { DataGrid } from '@mui/x-data-grid'

import { GridColDef } from '@mui/x-data-grid'
import Button from '../../ATEC UI/Button'
import { useQuery } from '@tanstack/react-query'
import projectsService from '../../../services/projectsService'

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

const vendors: VendorType[] = [
  {
    id: 0,
    name: 'Plascore',
  },
  {
    id: 0,
    name: 'Titus',
  },
]

const materials: MaterialType[] = [
  {
    id: 0,
    partNumber: 'M21760028_000',
    description: 'Pharma Ceiling Panel',
    width: 58,
    length: 120,
    tag: 'CP1',
    vendor: vendors[0],
  },
  {
    id: 0,
    partNumber: 'SD9812',
    description: 'Supply Air Diffuser',
    tag: 'SD1',
    width: 24,
    length: 24,
    vendor: vendors[1],
  },
]

const assemblies: AssemblyType[] = [
  {
    id: 0,
    assemblyId: 'FC - 1.0698-CP1',
    billOfMaterials: [
      {
        id: 0,
        material: materials[0],
        quantity: 1,
      },
      {
        id: 1,
        material: materials[1],
        quantity: 1,
      },
    ],
  },
]

const paginationModel = { page: 0, pageSize: 5 }

const Prefabricate = () => {
  const [project, setProject] = useState<ProjectType | null>(null)
  const [assembly, setAssembly] = useState<AssemblyType | null>(null)

  const {
    data: projects = [],
    //isLoading: isLoading,
    //isError: isError,
  } = useQuery<ProjectType[]>({
    queryKey: ['projects'],
    queryFn: projectsService.getAll,
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
    console.log(`Creating assembly ${assembly?.assemblyId}`)
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
        noOptionsText="No projects available"
      />

      {project && (
        <>
          <Autocomplete
            fullWidth
            options={assemblies}
            getOptionLabel={(option) => option.assemblyId || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={assembly}
            onChange={handleAssemblyChange}
            renderInput={(params) => <TextField {...params} label="Assembly" />}
            noOptionsText="No assemblies available"
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
