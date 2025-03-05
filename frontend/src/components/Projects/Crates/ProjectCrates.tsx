import { useState } from 'react'
import { CrateType } from '../../../types/crate'
import RelocateCrates from './RelocateCrates'
import { Stack } from '@mui/material'
import CratesTable from './CratesTable'

const ProjectCrates = () => {
  const [selectedCrates, setSelectedCrates] = useState<CrateType[]>([])

  return (
    <Stack spacing={4} justifyContent="space-between" height="100%">
      <CratesTable setSelectedCrates={setSelectedCrates} />
      <RelocateCrates crates={selectedCrates} />
    </Stack>
  )
}

export default ProjectCrates
