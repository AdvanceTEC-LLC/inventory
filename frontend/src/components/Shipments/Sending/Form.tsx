import { ProjectType } from '../../../types/project'
import { useQuery } from '@tanstack/react-query'
import projectsService from '../../../services/projectsService'
import cratesService from '../../../services/cratesService'
import shipmentsService from '../../../services/shipmentsService'
import { CrateType } from '../../../types/crate'
import { ShipmentType } from '../../../types/shipment'
import { useEffect, useState } from 'react'
import CratesTable from './Table'

const SendingShipmentForm = () => {
  const [cratesInWarehouse, setCratesInWarehouse] = useState<CrateType[]>([])

  const {
    data: projects = [],
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useQuery<ProjectType[]>({
    queryKey: ['projects'],
    queryFn: projectsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const {
    data: crates = [],
    isLoading: isCratesLoading,
    isError: isCratesError,
  } = useQuery<CrateType[]>({
    queryKey: ['crates'],
    queryFn: cratesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const {
    data: shipments = [],
    isLoading: isShipmentsLoading,
    isError: isShipmentsError,
  } = useQuery<ShipmentType[]>({
    queryKey: ['shipments'],
    queryFn: shipmentsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  useEffect(() => {
    if (!crates || !shipments) {
      return
    }

    const updatedCratesInWarehouse = crates.filter(
      (crate) =>
        !shipments.some((shipment) =>
          (shipment.crates ?? []).some(
            (shipmentCrate) => shipmentCrate.id === crate.id
          )
        )
    )
    setCratesInWarehouse(updatedCratesInWarehouse)
  }, [crates, shipments])

  if (isCratesLoading || isProjectsLoading || isShipmentsLoading) {
    return <div>Loading...</div>
  }

  if (isCratesError || isProjectsError || isShipmentsError) {
    return <div>Error fetching data.</div>
  }

  return (
    <form className="flex flex-col gap-y-4 overflow-x-auto">
      <div className="grid grid-cols-[1fr_1fr] gap-x-4 w-full">
        <label className="text-gray-500 text-nowrap">Destination Site</label>
        <select className="border-b-2 border-gray-300 w-full py-2 pr-2">
          {projects.map((project, index) => (
            <option key={index} value={project.name}>
              {project.number} {project.name}
            </option>
          ))}
        </select>
      </div>

      <CratesTable crates={cratesInWarehouse} />
    </form>
  )
}

export default SendingShipmentForm
