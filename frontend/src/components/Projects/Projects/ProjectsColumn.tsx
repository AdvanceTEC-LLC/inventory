import { Divider } from '@mui/material'
import { Stack } from '@mui/system'
import { useProjects } from '../../../hooks/useProjectsHook'
import AddProject from './AddProject'
import ProjectsList from './ProjectsList'
import { Title } from '../../ATEC UI/Text'
import { useMemo } from 'react'
import { useProject } from './ProjectContext'

const ProjectsColumn = () => {
  const { project, setProject } = useProject()
  const { data: projects = [] } = useProjects()

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => a.number - b.number),
    [projects]
  )

  return (
    <Stack spacing={4} flex={1}>
      <Title text="Projects" />
      <ProjectsList
        projects={sortedProjects}
        onSelectProject={setProject}
        selectedProject={project}
      />
      <Divider />
      <AddProject />
    </Stack>
  )
}

export default ProjectsColumn
