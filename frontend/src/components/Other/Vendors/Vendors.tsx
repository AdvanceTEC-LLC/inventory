import Container from '../../ATEC UI/Container'
import { Title, Subtitle } from '../../ATEC UI/Text'
import VendorsTable from './Table'

const Vendors = () => {
  return (
    <Container className="overflow-x-auto">
      <Title text={'Vendors'} />
      <Subtitle text="View the vendors that provide materials" />
      <VendorsTable />
    </Container>
  )
}

export default Vendors
