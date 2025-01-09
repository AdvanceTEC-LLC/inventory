import Container from '../../ATEC UI/Container'
import { Title, Subtitle } from '../../ATEC UI/Text'
import StoragesTable from './Table'

const Storages = () => {
  return (
    <Container className="overflow-x-auto">
      <Title text={'Storages'} />
      <Subtitle text="View the storage locations in the warehouse" />
      <StoragesTable />
    </Container>
  )
}

export default Storages
