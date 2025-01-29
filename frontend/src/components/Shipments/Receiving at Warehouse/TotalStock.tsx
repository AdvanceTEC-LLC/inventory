import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { NewMaterialType } from '../../../types/material'
import { NewShipmentType } from '../../../types/shipment'
import StockRow from './StockRow'
import { Subtext } from '../../ATEC UI/Text'

interface TotalStockProps {
  shipment: NewShipmentType
}

const TotalStock = ({ shipment }: TotalStockProps) => {
  const allCrateStock = shipment.crates.flatMap((crate) => crate.stock)

  const groupedStock = allCrateStock.reduce((acc, stock) => {
    const name = stock.material.name
    if (!acc[name]) {
      acc[name] = {
        material: stock.material,
        quantity: 0,
      }
    }
    acc[name].quantity += stock.quantity
    return acc
  }, {} as Record<string, { material: NewMaterialType; quantity: number }>)

  const totalStock = Object.values(groupedStock)

  if (shipment.crates.length === 0)
    return <Subtext text="This shipment has no stock" />

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Quantity</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {totalStock.map((stock, index) => (
          <StockRow stock={stock} key={index} />
        ))}
      </TableBody>
    </Table>
  )
}

export default TotalStock
