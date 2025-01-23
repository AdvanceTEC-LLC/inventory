import Nav from '../Nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Body from './Body'
import NotificationList from '../Notifications/NotificationList'
import FetchAutocomplete from '../FetchAutocomplete'
import projectsService from '../../services/projectsService'
import { ProjectType } from '../../types/project'
import { useDispatch } from 'react-redux'
import { setProject } from '../../reducers/projectReducer'
import Container from './Container'

const Layout = () => {
  const dispatch = useDispatch()

  const setFilter = (project: ProjectType | null) => {
    dispatch(setProject(project))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Body>
        <Container className="mb-8">
          <FetchAutocomplete
            setFilter={setFilter}
            service={projectsService}
            queryKey={'projects'}
            label={'Project'}
            getOptionLabel={(option: ProjectType): string =>
              `${option.number} ${option.name}`
            }
            isOptionEqualToValue={(option: ProjectType, value: ProjectType) =>
              option.id === value.id
            }
          />
        </Container>
        <Outlet />
      </Body>
      <NotificationList />
      <Footer />
    </div>
  )
}

export default Layout
