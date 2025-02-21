import { useState } from 'react'
import Container from '../ATEC UI/Container'
import { Title } from '../ATEC UI/Text'
import { ProjectType } from '../../types/project'
import { Stack, Divider } from '@mui/material'
import { useProjects } from '../../hooks/useProjectsHook'
import ProjectsList from './ProjectsList'
import ProjectAssemblies from './ProjectAssemblies'
import AddProject from './AddProject'
import AddAssembly from './AddAssembly'

const Assemblies = () => {
  const [selectedProject, setProject] = useState<ProjectType | null>(null)

  const { data: projects = [] } = useProjects()

  return (
    <Container>
      <Stack spacing={8} direction={{ xs: 'column', md: 'row' }}>
        {/* Left Side: Project List & Add */}
        <Stack spacing={4} flex={1}>
          <Title text="Projects" />
          <ProjectsList
            projects={projects}
            onSelectProject={setProject}
            selectedProject={selectedProject}
          />
          <Divider />
          <AddProject />
        </Stack>

        <Divider orientation="vertical" flexItem />

        {/* Right Side: Project Materials */}
        <Stack flex={3} spacing={4} justifyContent="space-between">
          <Stack spacing={4}>
            <Title
              text={`${
                selectedProject
                  ? `${selectedProject.number} ${selectedProject.name} `
                  : ''
              }Assemblies`}
            />
            <ProjectAssemblies project={selectedProject} />
          </Stack>
          <AddAssembly project={selectedProject} />
        </Stack>
      </Stack>
    </Container>
  )
}

export default Assemblies
