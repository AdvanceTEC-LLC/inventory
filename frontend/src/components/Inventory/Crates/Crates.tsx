import Container from '../../Container'
import { Title, Subtitle } from '../../Text'
import CratesTable from './Table'

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
