import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { ShipmentType } from '../../../types/shipment'
import ShipmentRow from './ShipmentRow'

interface ShipmentProps {
  shipment: ShipmentType
}

const Shipment = ({ shipment }: ShipmentProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Direction</TableCell>
            <TableCell>Send Date</TableCell>
            <TableCell>Received Date</TableCell>
            <TableCell>Vendor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <ShipmentRow shipment={shipment} />
        </TableBody>
      </Table>
    </div>
  )
}

export default Shipment
