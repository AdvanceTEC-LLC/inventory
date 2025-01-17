import { TableCell } from '@mui/material'
import { ShipmentType } from '../../../types/shipment'

interface ShipmentDetailsRowProps {
  shipment: ShipmentType
}

const ShipmentDetailsRow = ({ shipment }: ShipmentDetailsRowProps) => (
  <>
    <TableCell>
      <div className="text-text-secondary">{shipment.direction}</div>
    </TableCell>
    <TableCell>
      <div className="text-text-secondary">
        {new Date(shipment.sendDate).toLocaleDateString()}
      </div>
    </TableCell>
    <TableCell>
      <div className="text-text-secondary">
        {new Date(shipment.receivedDate).toLocaleDateString()}
      </div>
    </TableCell>
    <TableCell>
      <div className="text-text-secondary">
        {shipment.project.number} {shipment.project.name}
      </div>
    </TableCell>
    <TableCell>
      <div className="text-text-secondary">{shipment.vendor.name}</div>
    </TableCell>
  </>
)

export default ShipmentDetailsRow
