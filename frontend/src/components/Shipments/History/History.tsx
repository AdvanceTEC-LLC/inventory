import Container from '../../ATEC UI/Container'
import { Title, Subtitle } from '../../ATEC UI/Text'
import ShipmentsTable from './ShipmentsTable'

const History = () => {
  return (
    <Container className="overflow-x-auto">
      <Title text={'History'} />
      <Subtitle text="View shipment contents and track their status" />
      <ShipmentsTable />
    </Container>
  )
}

export default History
