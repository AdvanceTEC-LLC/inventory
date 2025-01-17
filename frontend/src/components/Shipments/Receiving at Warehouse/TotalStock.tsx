import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { CreateMaterialType } from '../../../types/material'
import { CreateShipmentType } from '../../../types/shipment'
import StockRow from './StockRow'
import { Subtext } from '../../ATEC UI/Text'

interface TotalStockProps {
  shipment: CreateShipmentType
}

const TotalStock = ({ shipment }: TotalStockProps) => {
  const allCrateStock = shipment.crates.flatMap((crate) => crate.stock)

  const groupedStock = allCrateStock.reduce((acc, stock) => {
    const partNumber = stock.material.partNumber
    if (!acc[partNumber]) {
      acc[partNumber] = {
        material: stock.material,
        quantity: 0,
      }
    }
    acc[partNumber].quantity += stock.quantity
    return acc
  }, {} as Record<string, { material: CreateMaterialType; quantity: number }>)

  const totalStock = Object.values(groupedStock)

  if (shipment.crates.length === 0)
    return <Subtext text="This shipment has no stock" />

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Part Number</TableCell>
          <TableCell>Description</TableCell>
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
