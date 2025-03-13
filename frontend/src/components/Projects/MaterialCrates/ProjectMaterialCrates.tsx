import { useState } from 'react'
import RelocateMaterialCrates from './RelocateMaterialCrates'
import { Stack } from '@mui/material'
import MaterialCratesTable from './MaterialCratesTable'
import { MaterialCrateType } from '../../../types/materialCrate'

const ProjectMaterialCrates = () => {
  const [selectedCrates, setSelectedCrates] = useState<MaterialCrateType[]>([])

  return (
    <Stack spacing={4} justifyContent="space-between" height="100%">
      <MaterialCratesTable setSelectedCrates={setSelectedCrates} />
      <RelocateMaterialCrates materialCrates={selectedCrates} />
    </Stack>
  )
}

export default ProjectMaterialCrates
