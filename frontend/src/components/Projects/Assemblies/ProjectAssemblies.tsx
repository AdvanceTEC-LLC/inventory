import AssembliesTable from './AssembliesTable'
import { Stack } from '@mui/system'
import AddAssembly from './AddAssembly'

const ProjectAssemblies = () => {
  return (
    <Stack spacing={4} justifyContent="space-between" height="100%">
      <AssembliesTable />
      <AddAssembly />
    </Stack>
  )
}

export default ProjectAssemblies
