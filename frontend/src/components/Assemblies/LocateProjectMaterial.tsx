import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { pageSizeOptions, paginationModel } from '../Tables/pagination'
import { location, number, opened } from '../Tables/Columns/crates'
import { MaterialType } from '../../types/material'
import { ProjectType } from '../../types/project'
import { useCrates } from '../../hooks/useCratesHook'
import { CrateType } from '../../types/crate'

interface LocateProjectMaterialProps {
  material: MaterialType
  quantity: number
  project: ProjectType
}

const LocateProjectMaterial = ({
  material,
  quantity,
  project,
}: LocateProjectMaterialProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  const { data: crates = [] } = useCrates()

  const filterCrates = () => {
    const projectCrates = [...crates].filter(
      (crate) => crate.project.id === project.id
    )

    // Filter crates containing the material, then sort by opened status
    const cratesWithStock = projectCrates.filter((crate) =>
      crate.stock.some(
        (stock) => stock.material.id === material.id && stock.quantity > 0
      )
    )

    const sortedCrates = cratesWithStock.sort(
      (a, b) => (b.opened ? 1 : 0) - (a.opened ? 1 : 0)
    ) // Prioritize opened crates

    let remainingQuantity = quantity
    const selectedCrates: (CrateType & { quantityToTake: number })[] = []

    for (const crate of sortedCrates) {
      if (remainingQuantity <= 0) break

      const stockItem = crate.stock.find(
        (stock) => stock.material.id === material.id
      )
      if (!stockItem) continue

      const takeAmount = Math.min(stockItem.quantity, remainingQuantity)
      remainingQuantity -= takeAmount

      // Add crate info with the calculated quantityToTake
      selectedCrates.push({ ...crate, quantityToTake: takeAmount })
    }

    return selectedCrates
  }

  const columns = [
    number,
    location,
    opened,
    {
      field: 'quantityToTake',
      headerName: 'Quantity To Take',
      width: 150,
    },
  ]

  return (
    <>
      <Button fullWidth onClick={handleOpen}>
        View
      </Button>

      {/* Modal / Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition={false}
        fullWidth
      >
        <DialogTitle>
          Crate{filterCrates.length > 1 ? 's' : ''} Containing {material.name}
        </DialogTitle>
        <DialogContent>
          <DataGrid
            sx={{ border: 0 }}
            rows={filterCrates()}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={pageSizeOptions}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LocateProjectMaterial
