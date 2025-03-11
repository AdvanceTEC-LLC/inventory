import { Tabs, Tab } from '@mui/material'
import { Stack, Box } from '@mui/system'
import { useState } from 'react'
import ProjectAssemblies from './Assemblies/ProjectAssemblies'
import ProjectStock from './Stock/ProjectStock'
import ProjectMaterialCrates from './MaterialCrates/ProjectMaterialCrates'
import ProjectAssemblyCrates from './AssemblyCrates/ProjectAssemblyCrates'

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
          <Tab label="Assembly Crates" />
        </Tabs>
      </Box>
      {value == 0 && <ProjectStock />}
      {value == 1 && <ProjectMaterialCrates />}
      {value == 2 && <ProjectAssemblies />}
      {value == 3 && <ProjectAssemblyCrates />}
    </Stack>
  )
}

export default ProjectTabs
