import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { MaterialType } from '../../../types/material'
import { ShipmentType } from '../../../types/shipment'
import StockRow from '../../Inventory/Crates/StockRow'
import { Header, Subtext } from '../../Text'

interface TotalStockProps {
  shipment: ShipmentType
}

const TotalStock = ({ shipment }: TotalStockProps) => {
  const allCrateStock = shipment.crates.flatMap((crate) => crate.stock)

  const groupedStock = allCrateStock.reduce((acc, stock) => {
    const partNumber = stock.material.partNumber
    if (!acc[partNumber]) {
      acc[partNumber] = {
        id: stock.id,
        material: stock.material,
        quantity: 0,
      }
    }
    acc[partNumber].quantity += stock.quantity
    return acc
  }, {} as Record<string, { id: number; material: MaterialType; quantity: number }>)

  const totalStock = Object.values(groupedStock)

  return (
    <div className="flex flex-col gap-y-2">
      <Header text="Total Stock" />
      {shipment.crates.length ? (
        <Table>
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell>Part Number</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalStock.map((stock) => (
              <StockRow stock={stock} key={stock.id} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <Subtext text="This shipment has no stock" />
      )}
    </div>
  )
}

export default TotalStock
