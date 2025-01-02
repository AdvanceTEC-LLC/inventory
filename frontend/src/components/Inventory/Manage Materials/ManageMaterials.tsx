import RemoveFromCatalogForm from './RemoveFromCatalogForm'
import AddToCatalogForm from './AddToCatalogForm'
import Container from '../../Container'
import { Subtitle, Title } from '../../Text'
import MaterialTable from './MaterialTable'

const userIsAdmin = true

const ManageMaterials = () => {
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
              <Title text="Catalog" />
              <Subtitle text="Each unique material tracked in inventory" />
            </div>
            <MaterialTable />
          </div>
        </Container>
      </div>
    )

  return (
    <div className="flex flex-col gap-8">
      <Container className="flex flex-col gap-y-8">
        <MaterialTable />
      </Container>
    </div>
  )
}

export default ManageMaterials
