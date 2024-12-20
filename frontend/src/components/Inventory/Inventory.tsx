import Container from '../Container'
import { Subtitle, Title } from '../Text'
import StockTable from './StockTable'

const Inventory = () => {
  return (
    <Container>
      <Title text={'Inventory'} />
      <Subtitle text="View total and project specific stock" />
      <StockTable />
    </Container>
  )
}

export default Inventory
