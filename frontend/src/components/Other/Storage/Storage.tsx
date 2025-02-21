import ShelfLocations from './Shelf Locations/ShelfLocations'
import StagingAreas from './Staging Areas/StagingAreas'
import WarehouseLocations from './Warehouse Locations/WarehouseLocations'

const Storage = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <ShelfLocations />
      <WarehouseLocations />
      <StagingAreas />
    </div>
  )
}

export default Storage
