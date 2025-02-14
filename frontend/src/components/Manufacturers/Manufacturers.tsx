import Container from '../ATEC UI/Container'
import { Title } from '../ATEC UI/Text'
import ManufacturersTable from './ManufacturersTable'

const Manufacturers = () => {
  return (
    <Container>
      <Title text={'Manufacturers'} />
      <ManufacturersTable />
    </Container>
  )
}

export default Manufacturers
