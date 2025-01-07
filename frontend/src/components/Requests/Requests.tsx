import Container from '../ATEC UI/Container'
import { Subtitle, Title } from '../ATEC UI/Text'
import RequestsTable from './RequestsTable'

const Requests = () => {
  return (
    <Container>
      <Title text={'Requests'} />
      <Subtitle text="Outstanding material requests from project sites" />
      <RequestsTable />
    </Container>
  )
}

export default Requests
