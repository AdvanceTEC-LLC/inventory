import { Divider } from '@mui/material'
import { Stack } from '@mui/system'
import { useProjects } from '../../../hooks/useProjectsHook'
import AddProject from './AddProject'
import ProjectsList from './ProjectsList'
import { Title } from '../../ATEC UI/Text'
import { ProjectType } from '../../../types/project'
import { useEffect, useState } from 'react'
import { useProject } from './ProjectContext'

const ProjectsColumn = () => {
  const [sortedProjects, setSortedProjects] = useState<ProjectType[]>([])

  const { project, setProject } = useProject()
  const { data: projects = [] } = useProjects()

  useEffect(() => {
    setSortedProjects([...projects].sort((a, b) => a.number - b.number))
  }, [projects])

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
