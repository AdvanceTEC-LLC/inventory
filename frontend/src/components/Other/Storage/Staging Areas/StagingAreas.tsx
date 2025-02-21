import Container from '../../../ATEC UI/Container'
import { Title, Subtitle } from '../../../ATEC UI/Text'
import StagingAreasTable from './StagingAreasTable'

const StagingAreas = () => {
  return (
    <Container>
      <Title text={'Staging Areas'} />
      <Subtitle text="View the staging areas in the warehouse" />
      <StagingAreasTable />
    </Container>
  )
}

export default StagingAreas
