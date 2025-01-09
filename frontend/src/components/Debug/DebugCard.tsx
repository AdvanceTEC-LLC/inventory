import { GridColDef } from '@mui/x-data-grid'
import { Title } from '../ATEC UI/Text'
import Table from './Table'
import Container from '../ATEC UI/Container'

interface DebugCardProps<T extends object> {
  title: string
  columns: GridColDef[]
  service: {
    getAll: () => Promise<T[]>
  }
}

const DebugCard = <T extends object>({
  title,
  columns,
  service,
}: DebugCardProps<T>) => {
  return (
    <Container>
      <Title text={title} />
      <Table
        title={title}
        columns={columns}
        service={{
          getAll: service.getAll,
        }}
      />
    </Container>
  )
}

export default DebugCard
