import FieldCratesTable from './FieldCratesTable'
import { Stack } from '@mui/system'
import AddFieldCrate from './AddFieldCrate'

const ProjectFieldCrates = () => {
  return (
    <Stack spacing={4} justifyContent="space-between" height="100%">
      <FieldCratesTable />
      <AddFieldCrate />
    </Stack>
  )
}

export default ProjectFieldCrates
