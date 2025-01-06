import RemoveFromCatalogForm from './RemoveFromCatalogForm'
import AddToCatalogForm from './AddToCatalogForm'
import Container from '../../Container'
import { Subtitle, Title } from '../../Text'
import MaterialsTable from './Table'

const userIsAdmin = false

const Materials = () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (userIsAdmin)
    return (
      <div className="flex flex-col gap-y-8 lg:gap-y-0 lg:grid lg:gap-x-8 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-y-8 flex-grow">
          <AddToCatalogForm />
          <RemoveFromCatalogForm />
        </div>
        <Container className="overflow-x-auto">
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-2">
              <Title text="Materials" />
              <Subtitle text="Each unique material tracked in inventory" />
            </div>
            <MaterialsTable />
          </div>
        </Container>
      </div>
    )

  return (
    <Container>
      <Title text={'Materials'} />
      <Subtitle text="Each unique material tracked in inventory" />
      <MaterialsTable />
    </Container>
  )
}

export default Materials
