import Container from '../../Container'
import { Subtitle, Title } from '../../Text'
import StockTable from './Table'

const Stock = () => {
  return (
    <Container>
      <Title text={'Stock'} />
      <Subtitle text="View material stock and filter by project" />
      <StockTable />
    </Container>
  )
}

export default Stock
