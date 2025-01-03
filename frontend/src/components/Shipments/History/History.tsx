import Container from '../../Container'
import { Title, Subtitle } from '../../Text'
import ShipmentsTable from './Table'

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
