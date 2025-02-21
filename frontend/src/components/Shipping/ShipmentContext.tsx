import { createContext, useContext, useState, ReactNode } from 'react'
import { ShipmentType } from './types'

const defaultShipment: ShipmentType = {
  type: 'incoming', // Set the default type here
  crates: [],
}

interface ShipmentContextType {
  shipment: ShipmentType | undefined
  setShipment: (shipment: ShipmentType) => void
}

const ShipmentContext = createContext<ShipmentContextType | undefined>(
  undefined
)

export const ShipmentProvider = ({ children }: { children: ReactNode }) => {
  const [shipment, setShipment] = useState<ShipmentType>(defaultShipment)

  return (
    <ShipmentContext.Provider value={{ shipment, setShipment }}>
      {children}
    </ShipmentContext.Provider>
  )
}

export const useShipment = () => {
  const context = useContext(ShipmentContext)
  if (!context) {
    throw new Error('useShipment must be used within a ShipmentProvider')
  }
  return context
}
