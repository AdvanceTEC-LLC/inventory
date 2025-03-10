import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { pageSizeOptions, paginationModel } from '../../Tables/pagination'
import { location, number, opened } from '../../Tables/Columns/materialCrates'
import { MaterialType } from '../../../types/material'
import { ProjectType } from '../../../types/project'
import { useMaterialCrates } from '../../../hooks/useMaterialCratesHook'
import { MaterialCrateType } from '../../../types/materialCrate'

interface LocateProjectMaterialProps {
  material: MaterialType
  quantity: number
  project: ProjectType
  setCratesAfterPrefab: Dispatch<SetStateAction<MaterialCrateType[]>>
}

const LocateProjectMaterial = ({
  material,
  quantity,
  project,
  setCratesAfterPrefab,
}: LocateProjectMaterialProps) => {
  const [filteredCrates, setFilteredCrates] = useState<
    (MaterialCrateType & { quantityToTake: number })[]
  >([])
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const { data: materialCrates = [] } = useMaterialCrates()

  useEffect(() => {
    if (materialCrates.length > 0) {
      filterCrates()
    }
  }, [materialCrates])

  const filterCrates = () => {
    const projectCrates = [...materialCrates].filter(
      (materialCrate) => materialCrate.crate.project.id === project.id
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
    const selectedCrates: (MaterialCrateType & { quantityToTake: number })[] =
      []
    const cratesAfterPrefab: MaterialCrateType[] = []

    for (const materialCrate of sortedCrates) {
      if (remainingQuantity <= 0) break

      const stockItem = materialCrate.stock.find(
        (stock) => stock.material.id === material.id
      )
      if (!stockItem) continue

      const takeAmount = Math.min(stockItem.quantity, remainingQuantity)
      remainingQuantity -= takeAmount

      // Add crate info with the calculated quantityToTake
      selectedCrates.push({ ...materialCrate, quantityToTake: takeAmount })

      // Update crate with the take amount removed
      const updatedCrate = {
        ...materialCrate,
        opened: true,
        stock: materialCrate.stock.map((stock) => {
          return {
            ...stock,
            quantity:
              stock.material.id === material.id
                ? stock.quantity - takeAmount
                : stock.quantity,
          }
        }),
      }

      cratesAfterPrefab.push(updatedCrate)
    }

    setCratesAfterPrefab(cratesAfterPrefab)
    setFilteredCrates(selectedCrates)
  }

  const columns = [
    number,
    location,
    opened,
    {
      field: 'quantityToTake',
      headerName: 'Quantity To Take',
      flex: 1,
    },
  ]

  return (
    <>
      <Button fullWidth onClick={handleOpen}>
        Locate
      </Button>

      {/* Modal / Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition={false}
        fullWidth
      >
        <DialogTitle>
          Crate{filteredCrates.length > 1 ? 's' : ''} Containing {material.name}
        </DialogTitle>
        <DialogContent>
          <DataGrid
            sx={{ border: 0 }}
            rows={filteredCrates}
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
