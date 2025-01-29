import Container from '../../../ATEC UI/Container'
import { Title, Subtitle } from '../../../ATEC UI/Text'
import ShelfLocationsTable from './ShelfLocationsTable'

const ShelfLocations = () => {
  return (
    <Container className="overflow-x-auto">
      <Title text={'Shelf Locations'} />
      <Subtitle text="View the shelf locations in the warehouse" />
      <ShelfLocationsTable />
    </Container>
  )
}

export default ShelfLocations
