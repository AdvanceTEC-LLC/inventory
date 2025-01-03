import Container from '../../Container'
import { Title, Subtitle } from '../../Text'
import ProjectsTable from './Table'

const Projects = () => {
  return (
    <Container className="overflow-x-auto">
      <Title text={'Projects'} />
      <Subtitle text="View the projects that materials can be assigned to" />
      <ProjectsTable />
    </Container>
  )
}

export default Projects
