import { Stack } from '@mui/system'
import { AssemblyCrateProvider } from './AssemblyCrateContext'
import AddAssemblyCrate from './AddAssemblyCrate'
import AssemblyCratesTable from './AssemblyCratesTable'
import RelocateAssemblyCrates from './RelocateAssemblyCrates'
import { SelectedAssemblyCratesProvider } from './SelectedAssemblyCratesContext'

const ProjectAssemblyCrates = () => {
  return (
    <Stack spacing={4} justifyContent="space-between" height="100%">
      <SelectedAssemblyCratesProvider>
        <AssemblyCratesTable />
        <Stack spacing={2} direction={'row'}>
          <RelocateAssemblyCrates />
          <AssemblyCrateProvider>
            <AddAssemblyCrate />
          </AssemblyCrateProvider>
        </Stack>
      </SelectedAssemblyCratesProvider>
    </Stack>
  )
}

export default ProjectAssemblyCrates
