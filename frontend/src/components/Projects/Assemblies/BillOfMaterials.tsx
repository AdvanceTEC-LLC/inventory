import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { AssemblyType } from '../../../types/assembly'
import { useEffect, useState } from 'react'
import { name, quantity } from '../../Tables/Columns/stock'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { pageSizeOptions, paginationModel } from '../../Tables/pagination'
import LocateProjectMaterial from './LocateProjectMaterial'
import { AssemblyMaterialType } from '../../../types/assemblyMaterial'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifyWithTimeout } from '../../../reducers/notificationsReducer'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'
import assembliesService from '../../../services/assembliesService'
import { useStock } from '../../../hooks/useStockHook'
import { MaterialCrateType } from '../../../types/materialCrate'
import materialCratesService from '../../../services/materialCratesService'
import { StockType } from '../../../types/stock'

interface BillOfMaterialsProps {
  assembly: AssemblyType
}

const BillOfMaterials = ({ assembly }: BillOfMaterialsProps) => {
  const [filteredAndGroupedStock, setFilteredAndGroupedStock] = useState<
    StockType[]
  >([])

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [cratesAfterPrefab, setCratesAfterPrefab] = useState<
    MaterialCrateType[]
  >([])

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const bulkUpdateCratesMutation = useMutation({
    mutationFn: (materialCrates: MaterialCrateType[]) =>
      materialCratesService.bulkUpdate(materialCrates),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['materialCrates'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          message: `Crate${cratesAfterPrefab.length > 1 ? 's' : ''} updated.`,
          status: 'success',
        })
      )
      handleClose()
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: error.name,
          message: error.message,
          status: 'error',
        })
      )
    },
  })

  const updateAssemblyMutation = useMutation({
    mutationFn: (assembly: AssemblyType) =>
      assembliesService.update(assembly.id, assembly),
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          message: 'Assembly updated.',
          status: 'success',
        })
      )
      handleClose()
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: error.name,
          message: error.message,
          status: 'error',
        })
      )
    },
  })

  const { data: stock = [] } = useStock()

  const getFilteredAndGroupedStock = () => {
    const filteredStock = getFilteredStock()
    const filteredAndGroupedStock = getGroupedStock(filteredStock)
    setFilteredAndGroupedStock(filteredAndGroupedStock)
  }

  const getFilteredStock = () => {
    const filteredStock = stock.filter(
      (s) => s.project.id === assembly.project.id
    )

    return filteredStock
  }

  const getGroupedStock = (filteredStock: StockType[]) => {
    const groupedStock = filteredStock.reduce(
      (acc: Record<number, StockType>, s) => {
        const materialId = s.material.id

        // Initialize the stock if it doesn't exist yet, otherwise add the quantity
        if (!Object.prototype.hasOwnProperty.call(acc, materialId)) {
          acc[materialId] = {
            id: s.id,
            material: s.material,
            project: s.project,
            quantity: s.quantity, // Initialize with the first quantity value
          }
        } else {
          acc[materialId].quantity += s.quantity // If exists, add to the existing quantity
        }

        return acc
      },
      {}
    )

    // Convert the grouped object back into an array
    const groupedStockArray = Object.values(groupedStock)

    return groupedStockArray
  }

  useEffect(() => {
    getFilteredAndGroupedStock()
  }, [stock, assembly])

  // Check if every material in the bill of materials has enough stock
  const materialsInStock = assembly.billOfMaterials?.every((bill) => {
    const stockItem = filteredAndGroupedStock.find(
      (s) => s.material.id === bill.material.id
    )
    return stockItem && stockItem.quantity >= bill.quantity
  })

  const handleSubmit = () => {
    setOpen(false)

    const updatedAssembly = {
      ...assembly,
      prefabricated: true,
    }

    updateAssemblyMutation.mutate(updatedAssembly)
    bulkUpdateCratesMutation.mutate(cratesAfterPrefab)
  }

  const actions: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params: GridRenderCellParams<AssemblyMaterialType>) => (
      <LocateProjectMaterial
        material={params.row.material}
        quantity={params.row.quantity}
        project={assembly.project}
        setCratesAfterPrefab={setCratesAfterPrefab}
      />
    ),
  }

  const columns = assembly.prefabricated
    ? [name, quantity]
    : [name, quantity, actions]

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
        <DialogTitle>Assembly {assembly.code}</DialogTitle>
        <DialogContent>
          <DataGrid
            sx={{ border: 0 }}
            rows={assembly.billOfMaterials}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={pageSizeOptions}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {!assembly.prefabricated && (
            <Button
              variant="contained"
              disabled={!materialsInStock}
              onClick={handleSubmit}
              loading={updateAssemblyMutation.isPending ? true : null}
            >
              Prefabricate
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BillOfMaterials
