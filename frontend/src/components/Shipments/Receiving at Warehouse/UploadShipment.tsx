import { useState } from 'react'
import { Header, Subtext, Text } from '../../ATEC UI/Text'
import ShipmentDetails from './ShipmentDetails'
import ATECButton from '../../ATEC UI/Button'
import { NewShipmentType } from '../../../types/shipment'
import ReceivingShipmentTable from './ReceivingShipmentTable'
import { Button, styled } from '@mui/material'
import DownloadFile from '../../DownloadFile'
import Papa, { ParseResult } from 'papaparse'
import { preprocessCSV } from '../../../utils/preprocessCSV'
import { NewCrateType } from '../../../types/crate'
import { NewStockType } from '../../../types/stock'
import { NewDivisionType } from '../../../types/division'
import { NewManufacturerType } from '../../../types/manufacturer'
import { NewMaterialType } from '../../../types/material'
import { NewProjectType } from '../../../types/project'
import { NewReceivedShipmentType } from '../../../types/receivedShipment'
import { NewWarehouseLocationType } from '../../../types/warehouseLocation'
import ConfirmReceivedShipmentButton from './ConfirmButton'

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

const defaultWarehouseLocation: NewWarehouseLocationType = {
  name: 'Shipping Bay',
}

const firstMaterialRowInExcel = 5 // The row number of the first material in the OCI from Excel
const firstCrateColumnInExcel = 4 // The column number of the first crate number in the OCI from Excel
const quantityColumnOffset = -1 // Direction offset of the quantity column related to a given crate number
const materialNameColumnInExcel = 1 // Material name column number

const UploadShipment = () => {
  const [file, setFile] = useState<File | null>(null)
  const [receivedShipment, setReceivedShipment] =
    useState<NewReceivedShipmentType>()

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

  const parseShipment = (data: string) => {
    const preprocessedData = preprocessCSV(data)

    Papa.parse(preprocessedData, {
      header: false,
      skipEmptyLines: true,
      complete: (results: ParseResult<string[]>) => {
        const rows: string[][] = results.data

        try {
          const manufacturer: NewManufacturerType = getManufacturer(rows)
          const project: NewProjectType = getProject(rows)
          const receivedDate: Date = getReceivedDate(rows)

          const crates: NewCrateType[] = getCrates(rows, project, manufacturer)

          const trackingNumber: number = Math.floor(Math.random() * 10000)

          const shipment: NewShipmentType = {
            trackingNumber,
            project,
            crates,
          }

          const newReceivedShipment: NewReceivedShipmentType = {
            shipment,
            manufacturer,
            receivedDate,
          }

          setReceivedShipment(newReceivedShipment)
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(error.message)
          } else {
            console.error('An unknown error occurred')
          }
        }
      },
      error: (error: unknown) => {
        console.error('Error parsing CSV:', error)
      },
    })
  }

  const getManufacturer = (rows: string[][]): NewManufacturerType => {
    const name = rows[1][0]?.trim()

    if (!name) throw new Error('Manufacturer name cannot be null')

    const newManufacturer: NewManufacturerType = {
      name,
    }

    return newManufacturer
  }

  const getProject = (rows: string[][]): NewProjectType => {
    const number: number = parseInt(rows[1][1]?.trim())
    const name: string = rows[1][2]?.trim()
    const active: boolean = true

    if (!name) throw new Error('Project name cannot be null')
    if (!number) throw new Error('Project number cannot be null')

    const newProject: NewProjectType = {
      number,
      name,
      active,
    }

    return newProject
  }

  const getReceivedDate = (rows: string[][]): Date => {
    const receivedDate = new Date(rows[1][3]?.trim())

    if (!receivedDate) throw new Error('Received date cannot be null')

    return receivedDate
  }

  const getCrates = (
    rows: string[][],
    project: NewProjectType,
    manufacturer: NewManufacturerType
  ): NewCrateType[] => {
    if (!project) throw new Error('Project cannot be null')

    const materialRows = rows
      .slice(firstMaterialRowInExcel - 1)
      .filter((row) => row[0]?.trim())

    let crates: NewCrateType[] = []

    materialRows.map((row) => {
      const material: NewMaterialType = getMaterial(row, manufacturer)

      let crateColumnIndex = firstCrateColumnInExcel - 1

      while (
        row[crateColumnIndex]?.trim() !== undefined &&
        row[crateColumnIndex]?.trim() !== ''
      ) {
        if (!material) break

        const crateNumber = row[crateColumnIndex]?.trim()
        const quantity = parseInt(
          row[crateColumnIndex + quantityColumnOffset]?.trim() || '0',
          10
        )

        const stock: NewStockType = { material, quantity }

        const existingCrate = crates.find(
          (crate) => crate.number === crateNumber
        )

        if (existingCrate) {
          existingCrate.stock.push(stock)
        } else {
          const newCrate = {
            number: crateNumber,
            warehouseLocation: defaultWarehouseLocation,
            project,
            manufacturer,
            opened: false,
            stock: [stock],
          }

          crates.push(newCrate)
        }

        crateColumnIndex += 2
      }
    })

    if (!crates) throw new Error('Crates cannot be null')

    return crates
  }

  const getMaterial = (row: string[], manufacturer: NewManufacturerType) => {
    const name = row[materialNameColumnInExcel - 1]?.trim()

    if (!name) throw new Error('Material name cannot be null')

    const division: NewDivisionType = {
      number: 0,
      name: 'Material',
    }

    const material: NewMaterialType = {
      name,
      division,
      manufacturer,
    }

    return material
  }

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-8 md:grid md:grid-cols-[1fr_1fr] md:gap-x-8">
        <div className="flex flex-col gap-y-2">
          <Header text="Upload Shipment" />

          {file && receivedShipment ? (
            <div>
              <div className="flex flex-col gap-y-2">
                <Text text={file.name} />
                <ATECButton
                  type="reset"
                  text="Remove file"
                  onClick={() => {
                    setFile(null)
                    setReceivedShipment(undefined)
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
                header={'No shipment?'}
                file={{
                  path: '/files/Shipping Template.xlsx',
                  name: 'Shipping Template.xlsx',
                }}
              />
            </div>
          )}
        </div>
        {receivedShipment && (
          <ShipmentDetails receivedShipment={receivedShipment} />
        )}
      </div>

      {receivedShipment && (
        <div className="flex flex-col gap-y-8">
          <ReceivingShipmentTable shipment={receivedShipment.shipment} />
          <ConfirmReceivedShipmentButton receivedShipment={receivedShipment} />
        </div>
      )}
    </div>
  )
}

export default UploadShipment
