import { useQuery } from '@tanstack/react-query'
import crateStockService from '../../services/crateStockService'
import shipmentCratesService from '../../services/shipmentCratesService'
import shipmentsService from '../../services/shipmentsService'
import stockService from '../../services/stockService'
import { CrateStockType } from '../../types/crateStock'
import { ShipmentType, ShipmentDetailsType } from '../../types/shipment'
import { ShipmentCrateType } from '../../types/shipmentCrate'
import { StockType } from '../../types/stock'

const ShipmentDetails = () => {
  const {
    data: shipments = [],
    isLoading: isShipmentsLoading,
    isError: isShipmentsError,
  } = useQuery<ShipmentType[]>({
    queryKey: ['shipments'],
    queryFn: shipmentsService.getAll,
    staleTime: 1000 * 60 * 5,
  })

  const {
    data: shipmentCrates = [],
    isLoading: isShipmentCratesLoading,
    isError: isShipmentCratesError,
  } = useQuery<ShipmentCrateType[]>({
    queryKey: ['shipmentCrates'],
    queryFn: shipmentCratesService.getAll,
    staleTime: 1000 * 60 * 5,
  })

  const {
    data: crateStock = [],
    isLoading: isCrateStockLoading,
    isError: isCrateStockError,
  } = useQuery<CrateStockType[]>({
    queryKey: ['crateStock'],
    queryFn: crateStockService.getAll,
    staleTime: 1000 * 60 * 5,
  })

  const {
    data: stock = [],
    isLoading: isStockLoading,
    isError: isStockError,
  } = useQuery<StockType[]>({
    queryKey: ['stocks'],
    queryFn: stockService.getAll,
    staleTime: 1000 * 60 * 5,
  })

  if (
    isShipmentsLoading ||
    isShipmentCratesLoading ||
    isCrateStockLoading ||
    isStockLoading
  ) {
    return <div>Loading...</div>
  }

  if (
    isShipmentsError ||
    isShipmentCratesError ||
    isCrateStockError ||
    isStockError
  ) {
    return <div>Error fetching data.</div>
  }

  const shipment = shipments[0] // Select the first shipment for proof of concept.

  // Map crates to the current shipment.
  const cratesInShipment = shipmentCrates
    .filter((sc) => sc.shipment.id === shipment.id)
    .map((sc) => sc.crate)

  // Group stocks by crate for quick lookup.
  const crateStockMap = new Map<number, StockType[]>(
    crateStock.reduce((entries, cs) => {
      const crateId = cs.crate.id
      const existing = entries.get(crateId) || []
      entries.set(crateId, [...existing, cs.stock])
      return entries
    }, new Map<number, StockType[]>())
  )

  // Build detailed crates with associated stocks.
  const detailedCrates = cratesInShipment.map((crate) => ({
    ...crate,
    stock: crateStockMap.get(crate.id) || [], // Get stocks for this crate.
  }))

  const shipmentDetails: ShipmentDetailsType = {
    ...shipment,
    crates: detailedCrates,
  }

  console.log(shipmentDetails)

  return (
    <div>
      {shipmentDetails.crates.map((crate) => (
        <div key={crate.id}>
          <h3>Crate {crate.number}</h3>
          {crate.stock.map((stock) => (
            <p key={stock.id}>
              Material: {stock.material.description}, Quantity: {stock.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ShipmentDetails
