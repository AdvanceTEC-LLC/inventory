import Container from '../../ATEC UI/Container'
import { Title, Subtitle } from '../../ATEC UI/Text'
import LocationsTable from './Table'

const Locations = () => {
  return (
    <Container className="overflow-x-auto">
      <Title text={'Locations'} />
      <Subtitle text="View the storage locations in the warehouse" />
      <LocationsTable />
    </Container>
  )
}

export default Locations
