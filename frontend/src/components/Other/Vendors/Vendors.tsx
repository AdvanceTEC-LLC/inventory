import Container from '../../Container'
import { Title, Subtitle } from '../../Text'
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
