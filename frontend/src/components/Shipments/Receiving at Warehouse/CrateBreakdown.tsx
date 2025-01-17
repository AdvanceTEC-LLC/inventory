import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { CreateCrateType } from '../../../types/crate'
import { Subtext } from '../../ATEC UI/Text'
import CrateRow from './CrateRow'

interface CrateBreakdownProps {
  crates: CreateCrateType[]
}

const CrateBreakdown = ({ crates }: CrateBreakdownProps) => {
  if (!crates.length) return <Subtext text="This shipment has no crates" />

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Number</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {crates.map((crate, index) => (
          <CrateRow crate={crate} key={index} />
        ))}
      </TableBody>
    </Table>
  )
}

export default CrateBreakdown
