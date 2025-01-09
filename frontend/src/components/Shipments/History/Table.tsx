import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { ShipmentType } from '../../../types/shipment'
import { useQuery } from '@tanstack/react-query'
import shipmentsService from '../../../services/shipmentsService'
import ShipmentRow from './ShipmentRow'

const ShipmentsTable = () => {
  const {
    data: shipments = [],
    isLoading,
    isError,
  } = useQuery<ShipmentType[]>({
    queryKey: ['shipments'],
    queryFn: shipmentsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching shipment data.</div>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-50">
            <TableCell />
            <TableCell>Direction</TableCell>
            <TableCell>Send Date</TableCell>
            <TableCell>Received Date</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Vendor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shipments.map((shipment) => (
            <ShipmentRow key={shipment.id} shipment={shipment} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ShipmentsTable
