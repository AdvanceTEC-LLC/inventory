import { createContext, useContext, useState, ReactNode } from 'react'
import { SentShipmentType } from '../types'

interface SentShipmentContextType {
  sentShipment: SentShipmentType | undefined
  setSentShipment: (shipment: SentShipmentType) => void
}

const SentShipmentContext = createContext<SentShipmentContextType | undefined>(
  undefined
)

export const SentShipmentProvider = ({ children }: { children: ReactNode }) => {
  const [sentShipment, setSentShipment] = useState<SentShipmentType>()

  return (
    <SentShipmentContext.Provider value={{ sentShipment, setSentShipment }}>
      {children}
    </SentShipmentContext.Provider>
  )
}

export const useSentShipment = () => {
  const context = useContext(SentShipmentContext)
  if (!context) {
    throw new Error(
      'useSentShipment must be used within a SentShipmentProvider'
    )
  }
  return context
}
