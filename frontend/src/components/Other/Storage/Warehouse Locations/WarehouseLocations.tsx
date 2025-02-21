import Container from '../../../ATEC UI/Container'
import { Title, Subtitle } from '../../../ATEC UI/Text'
import WarehouseLocationsTable from './WarehouseLocationsTable'

const WarehouseLocations = () => {
  return (
    <Container>
      <Title text={'Warehouse Locations'} />
      <Subtitle text="View the warehouse locations in the warehouse" />
      <WarehouseLocationsTable />
    </Container>
  )
}

export default WarehouseLocations
