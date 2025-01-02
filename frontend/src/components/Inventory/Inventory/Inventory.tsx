import Container from '../../Container'
import { Subtitle, Title } from '../../Text'
import InventoryTable from './Table'

const Inventory = () => {
  return (
    <Container>
      <Title text={'Inventory'} />
      <Subtitle text="View material stock and filter by project" />
      <InventoryTable />
    </Container>
  )
}

export default Inventory
