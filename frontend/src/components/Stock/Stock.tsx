import Container from '../ATEC UI/Container'
import { Title } from '../ATEC UI/Text'
import MaterialsTable from './StockTable'

const Stock = () => {
  return (
    <Container>
      <Title text={'Stock'} />
      <MaterialsTable />
    </Container>
  )
}

export default Stock
