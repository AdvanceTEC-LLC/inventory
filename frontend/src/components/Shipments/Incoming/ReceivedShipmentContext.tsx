import { createContext, useContext, useState, ReactNode } from 'react'
import { ReceivedShipmentType } from '../types'

interface ReceivedShipmentContextType {
  receivedShipment: ReceivedShipmentType | undefined
  setReceivedShipment: (shipment: ReceivedShipmentType) => void
}

const ReceivedShipmentContext = createContext<
  ReceivedShipmentContextType | undefined
>(undefined)

export const ReceivedShipmentProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [receivedShipment, setReceivedShipment] =
    useState<ReceivedShipmentType>()

  return (
    <ReceivedShipmentContext.Provider
      value={{ receivedShipment, setReceivedShipment }}
    >
      {children}
    </ReceivedShipmentContext.Provider>
  )
}

export const useReceivedShipment = () => {
  const context = useContext(ReceivedShipmentContext)
  if (!context) {
    throw new Error(
      'useReceivedShipment must be used within a ReceivedShipmentProvider'
    )
  }
  return context
}
