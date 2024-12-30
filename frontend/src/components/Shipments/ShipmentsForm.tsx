import { useState } from 'react'
import { projects } from '../../data'
import { Header, Subtitle, Title } from '../Text'
import CsvFileUpload from './CsvFileUpload'
import { VendorType } from '../../types/vendor'
import { useQuery } from '@tanstack/react-query'
import vendorsService from '../../services/vendorsService'
import { ShipmentTypeEnum } from '../../types/shipment'

const ShipmentsForm = () => {
  const [shipmentType, setShipmentType] = useState<ShipmentTypeEnum>(
    Object.values(ShipmentTypeEnum)[0]
  )

  const {
    data: vendors = [],
    isLoading,
    isError,
  } = useQuery<VendorType[]>({
    queryKey: ['vendors'],
    queryFn: vendorsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching vendor data.</div>
  }

  return (
    <form className="flex flex-col gap-y-8 overflow-x-auto">
      <div className="flex flex-col gap-y-2">
        <Title text="Track New Shipment" />
        <Subtitle text="Log resource changes related to incoming or outgoing shipments" />
      </div>
      <div className="flex flex-col gap-y-2">
        <Header text="Tracking" />

        <div className="grid grid-cols-[1fr_1fr] gap-x-4 w-full">
          <label className="text-gray-500 text-nowrap">Shipment Type</label>
          <select
            className="border-b-2 border-gray-300 w-full py-2 pr-2"
            value={shipmentType}
            onChange={(event) => {
              setShipmentType(event.target.value as ShipmentTypeEnum)
            }}
          >
            {Object.values(ShipmentTypeEnum).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {shipmentType === Object.values(ShipmentTypeEnum)[0] && (
          <div className="grid grid-cols-[1fr_1fr] gap-x-4 w-full">
            <label className="text-gray-500 text-nowrap">Vendor</label>
            <select className="border-b-2 border-gray-300 w-full py-2 pr-2">
              {vendors.map((vendor, index) => (
                <option key={index} value={vendor.name}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {shipmentType === Object.values(ShipmentTypeEnum)[1] && (
          <div className="grid grid-cols-[1fr_1fr] gap-x-4 w-full">
            <label className="text-gray-500 text-nowrap">
              Destination Site
            </label>
            <select className="border-b-2 border-gray-300 w-full py-2 pr-2">
              {projects.map((project, index) => (
                <option key={index} value={project.name}>
                  {project.number} {project.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {shipmentType === Object.values(ShipmentTypeEnum)[0] && <CsvFileUpload />}
    </form>
  )
}

export default ShipmentsForm
