import Container from '../../ATEC UI/Container'
import { Title, Subtitle } from '../../ATEC UI/Text'
import ManufacturersTable from './Table'

const Manufacturers = () => {
  return (
    <Container className="overflow-x-auto">
      <Title text={'Manufacturers'} />
      <Subtitle text="View the manufacturers that provide materials" />
      <ManufacturersTable />
    </Container>
  )
}

export default Manufacturers
