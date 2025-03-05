import { Tabs, Tab } from '@mui/material'
import { Stack, Box } from '@mui/system'
import { useState } from 'react'
import ProjectAssemblies from './Assemblies/ProjectAssemblies'
import ProjectFieldCrates from './FieldCrates/ProjectFieldCrates'
import ProjectCrates from './Crates/ProjectCrates'
import ProjectStock from './Stock/ProjectStock'

const ProjectTabs = () => {
  const [value, setValue] = useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Stack flex={3} spacing={4}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="project tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Stock" />
          <Tab label="Material Crates" />
          <Tab label="Assemblies" />
          <Tab label="Field Crates" />
        </Tabs>
      </Box>
      {value == 0 && <ProjectStock />}
      {value == 1 && <ProjectCrates />}
      {value == 2 && <ProjectAssemblies />}
      {value == 3 && <ProjectFieldCrates />}
    </Stack>
  )
}

export default ProjectTabs
