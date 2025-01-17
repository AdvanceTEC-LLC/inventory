import Container from '../../ATEC UI/Container'
import { Title, Subtitle } from '../../ATEC UI/Text'
import CratesTable from './CratesTable'

const Crates = () => {
  return (
    <Container className="overflow-x-auto">
      <Title text={'Crates'} />
      <Subtitle text="View the contents and locations of all crates" />
      <CratesTable />
    </Container>
  )
}

export default Crates
