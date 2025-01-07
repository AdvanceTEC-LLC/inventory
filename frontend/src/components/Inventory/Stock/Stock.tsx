import Container from '../../ATEC UI/Container'
import { Subtitle, Title } from '../../ATEC UI/Text'
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
