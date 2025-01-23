import { useState } from 'react'

// Parsing
import Papa from 'papaparse'

// Styled Components
import { Header, Subtext, Text } from '../../ATEC UI/Text'

import ShipmentDetails from './ShipmentDetails'
import ConfirmShipmentButton from './ConfirmButton'
import ATECButton from '../../ATEC UI/Button'
import {
  CreateShipmentType,
  ShipmentDirectionEnum,
} from '../../../types/shipment'
import { CrateLocationEnum, CreateCrateType } from '../../../types/crate'
import { CreateStockType } from '../../../types/stock'
import { CreateMaterialType } from '../../../types/material'
import { CreateVendorType } from '../../../types/vendor'
import { CreateProjectType } from '../../../types/project'
import ReceivingShipmentTable from './ReceivingShipmentTable'
import { Button, styled } from '@mui/material'
import DownloadFile from './DownloadFile'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const UploadShipment = () => {
  const [file, setFile] = useState<File | null>(null)
  const [shipment, setShipment] = useState<CreateShipmentType | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) {
      console.log("Error: Couldn't read the file.")
      return
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      const content = event.target?.result as string
      parseShipment(content)
    }

    const file = event.target.files[0]
    setFile(file)
    reader.readAsText(file)
  }

  // Handles cells with commas in their data
  const preprocessData = (data: string): string => {
    return data
      .split('\n')
      .map((line) =>
        line
          .split(',')
          .map((cell) => {
            if (cell.includes(',') && !cell.startsWith('"')) {
              return `"${cell.trim()}"`
            }
            return cell.trim()
          })
          .join(',')
      )
      .join('\n')
  }

  const getDetails = (rows: string[][]) => {
    const direction: ShipmentDirectionEnum = ShipmentDirectionEnum.In

    const vendorName = rows[1][1]?.trim()

    const projectNumber: number = parseInt(rows[1][2]?.trim())
    const projectName: string = rows[1][3]?.trim()

    const sendDate = new Date(rows[1][4]?.trim())
    const receivedDate = new Date(rows[1][5]?.trim())

    const vendor: CreateVendorType = {
      name: vendorName,
    }

    const project: CreateProjectType = {
      number: projectNumber,
      name: projectName,
    }

    if (!project || !vendor || !sendDate || !receivedDate) {
      console.error('Error: Missing details in the shipment')
      return null
    }

    return {
      direction,
      vendor,
      project,
      sendDate,
      receivedDate,
    }
  }

  const getMaterial = (row: string[], vendor: CreateVendorType) => {
    const partNumber = row[0]?.trim()
    const description = row[1]?.trim()
    const thickness = isNaN(parseInt(row[2]?.trim()))
      ? undefined
      : parseInt(row[2]?.trim())
    const width = isNaN(parseInt(row[3]?.trim()))
      ? undefined
      : parseInt(row[3]?.trim())
    const length = isNaN(parseInt(row[4]?.trim()))
      ? undefined
      : parseInt(row[4]?.trim())
    const topFinish = row[5]?.trim()
    const bottomFinish = row[6]?.trim()
    const xDimension = isNaN(parseInt(row[7]?.trim()))
      ? undefined
      : parseInt(row[7]?.trim())
    const cutout = row[8]?.trim() === 'Y'
    const tag = row[9]?.trim()

    const material: CreateMaterialType = {
      partNumber,
      description,
      thickness,
      width,
      length,
      topFinish,
      bottomFinish,
      xDimension,
      cutout,
      tag,
      vendor,
    }

    return material
  }

  const getCrates = (rows: string[][], details: any) => {
    const materialRows = rows.slice(4)

    let crates: CreateCrateType[] = []

    materialRows.map((row) => {
      const material = getMaterial(row, details.vendor)

      let crateColumnIndex = 12

      while (
        row[crateColumnIndex]?.trim() !== undefined &&
        row[crateColumnIndex]?.trim() !== ''
      ) {
        const crateNumber = row[crateColumnIndex]?.trim()
        const quantity = parseInt(row[crateColumnIndex - 1]?.trim() || '0', 10)

        const stock: CreateStockType = { material, quantity }

        // Add stock to existing crate or create a new crate
        if (crates.find((crate) => crate.number === crateNumber)) {
          const crate = crates.find((crate) => crate.number === crateNumber)
          crate?.stock.push(stock)
        } else {
          crates.push({
            number: crateNumber,
            location: CrateLocationEnum.ShippingBay,
            project: details.project,
            vendor: details.vendor,
            stock: [stock],
          })
        }

        crateColumnIndex += 2
      }
    })

    if (!crates) {
      console.error('Error: No crates found in the shipment')
      return null
    }

    return crates
  }

  const parseShipment = (data: string) => {
    const preprocessedData = preprocessData(data)

    Papa.parse(preprocessedData, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as string[][]

        const details = getDetails(rows)
        if (!details) {
          return
        }

        const crates: CreateCrateType[] | null = getCrates(rows, details)
        if (!crates) {
          return
        }

        setShipment({ ...details, crates })
      },
      error: (error: unknown) => {
        console.error('Error parsing CSV:', error)
      },
    })
  }

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-8 md:grid md:grid-cols-[1fr_1fr] md:gap-x-8">
        <div className="flex flex-col gap-y-2">
          <Header text="Upload Shipment" />

          {file && shipment ? (
            <div>
              <div className="flex flex-col gap-y-2">
                <Text text={file.name} />
                <ATECButton
                  type="reset"
                  text="Remove file"
                  onClick={() => {
                    setFile(null)
                    setShipment(null)
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col gap-y-2">
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    multiple
                  />
                </Button>
                <Subtext text="Upload a .csv file using the shipping template" />
              </div>

              <DownloadFile
                path={'/files/Shipping Template.xlsx'}
                name={'Shipping Template.xlsx'}
              />
            </div>
          )}
        </div>
        {shipment && <ShipmentDetails shipment={shipment} />}
      </div>

      {shipment && (
        <div className="flex flex-col gap-y-8">
          <ReceivingShipmentTable shipment={shipment} />
          <ConfirmShipmentButton shipment={shipment} />
        </div>
      )}
    </div>
  )
}

export default UploadShipment
