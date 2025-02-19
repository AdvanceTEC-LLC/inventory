import { List, ListItemButton, ListItemText } from '@mui/material'
import { ProjectType } from '../../types/project'

interface ProjectsListProps {
  projects: ProjectType[]
  selectedProject: ProjectType | null
  onSelectProject: (Project: ProjectType) => void
}

const ProjectsList = ({
  projects,
  selectedProject,
  onSelectProject,
}: ProjectsListProps) => {
  const sortedProjects = [...projects].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <List component="nav" className="h-48 md:h-96 overflow-y-auto">
      {sortedProjects.map((project) => (
        <ListItemButton
          key={project.id}
          selected={selectedProject?.id === project.id}
          onClick={() => onSelectProject(project)}
        >
          <ListItemText primary={`${project.number} ${project.name}`} />
        </ListItemButton>
      ))}
    </List>
  )
}

export default ProjectsList
