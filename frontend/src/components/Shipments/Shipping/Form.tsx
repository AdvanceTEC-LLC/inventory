import { ProjectType } from '../../../types/project'
import { useQuery } from '@tanstack/react-query'
import projectsService from '../../../services/projectsService'

const ReceivingShipmentsForm = () => {
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery<ProjectType[]>({
    queryKey: ['projects'],
    queryFn: projectsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching project data.</div>
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
    </form>
  )
}

export default ReceivingShipmentsForm
