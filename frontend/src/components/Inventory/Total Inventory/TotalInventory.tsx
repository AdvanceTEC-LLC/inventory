import Container from '../../Container'
import { Subtitle, Title } from '../../Text'
import TotalInventoryTable from './Table'

const TotalInventory = () => {
  return (
    <Container>
      <Title text={'Inventory'} />
      <Subtitle text="View total warehouse stock" />
      <TotalInventoryTable />
    </Container>
  )
}

export default TotalInventory
