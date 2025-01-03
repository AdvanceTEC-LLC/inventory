import { useState } from 'react'

// Parsing
import Papa from 'papaparse'
import {
  Crate,
  Project,
  ReceivedShipment,
  ShipmentMaterial,
  Stock,
} from './types'

// Styled Components
import { Subtext, Subtitle, Text, Title } from '../../../Text'
import Button from '../../../Button'

import ContentsTable from './ContentsTable'
import ShipmentDetails from './ShipmentDetails'

const UploadShipment = () => {
  const [file, setFile] = useState<File | null>(null)
  const [shipment, setShipment] = useState<ReceivedShipment | null>(null)

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
    const company = rows[1][0]?.trim()

    const projectNumber: number = parseInt(rows[1][1]?.trim())
    const projectName: string = rows[1][2]?.trim()

    const vendor = rows[1][3]?.trim()

    const shipDate = rows[1][4]?.trim()
    const receivedDate = rows[1][5]?.trim()

    const project: Project = {
      number: projectNumber,
      name: projectName,
    }

    if (!company || !project || !vendor || !shipDate || !receivedDate) {
      console.error('Error: Missing details in the shipment')
      return null
    }

    return {
      company,
      project,
      vendor,
      shipDate,
      receivedDate,
    }
  }

  const getMaterial = (row: string[]) => {
    const number = row[0]?.trim()
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
    const squareFeet = isNaN(parseInt(row[5]?.trim()))
      ? undefined
      : parseFloat(row[5]?.trim())
    const topColor = row[6]?.trim()
    const bottomColor = row[7]?.trim()
    const xDimension = isNaN(parseInt(row[8]?.trim()))
      ? undefined
      : parseInt(row[8]?.trim())
    const cutout = row[9]?.trim()
    const tag = row[10]?.trim()
    const additionalTagInformation = row[11]?.trim()

    const material: ShipmentMaterial = {
      number,
      description,
      thickness,
      width,
      length,
      squareFeet,
      topColor,
      bottomColor,
      xDimension,
      cutout,
      tag,
      additionalTagInformation,
    }

    return material
  }

  const getCrates = (rows: string[][]) => {
    const materialRows = rows.slice(4)

    let crates: Crate[] = []

    materialRows.map((row) => {
      const material = getMaterial(row)

      let crateColumnIndex = 14

      while (
        row[crateColumnIndex]?.trim() !== undefined &&
        row[crateColumnIndex]?.trim() !== ''
      ) {
        const crateNumber = row[crateColumnIndex]?.trim()
        const quantity = parseInt(row[crateColumnIndex - 1]?.trim() || '0', 10)

        const stock: Stock = { material, quantity }

        // Add stock to existing crate or create a new crate
        if (crates.find((crate) => crate.number === crateNumber)) {
          const crate = crates.find((crate) => crate.number === crateNumber)
          crate?.stock.push(stock)
        } else {
          crates.push({ number: crateNumber, stock: [stock] })
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

        const details: ShipmentDetails | null = getDetails(rows)
        if (!details) {
          return
        }

        const crates: Crate[] | null = getCrates(rows)
        if (!crates) {
          return
        }

        setShipment({ details, crates })
      },
      error: (error: unknown) => {
        console.error('Error parsing CSV:', error)
      },
    })
  }

  const confirmShipment = async () => {
    if (!shipment) {
      console.error('Error: No shipment to confirm')
      return
    }

    console.log('Shipment confirmed:', shipment)
  }

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-8 md:grid md:grid-cols-[1fr_1fr] md:gap-x-4">
        <div className="flex flex-col gap-y-8">
          <div>
            <Title text={'Receiving Shipments'} />
            <Subtitle text="Add new stock to the warehouse inventory" />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-gray-500 text-nowrap">Upload Shipment</label>

            {file && shipment ? (
              <div>
                <div>
                  <Text text={file.name} />
                  <button
                    className="w-fit text-red-500"
                    onClick={() => {
                      setFile(null)
                      setShipment(null)
                    }}
                  >
                    Remove file
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-y-2">
                <input type="file" accept=".csv" onChange={handleFileChange} />
                <Subtext text="Upload a CSV file with shipment data" />
              </div>
            )}
          </div>
        </div>
        {shipment && <ShipmentDetails shipment={shipment} />}
      </div>

      {shipment && (
        <div className="flex flex-col gap-y-8">
          <ContentsTable crates={shipment.crates} />
          <Button
            text="Confirm Shipment"
            onClick={() => {
              void confirmShipment()
            }}
          />
        </div>
      )}
    </div>
  )
}

export default UploadShipment
