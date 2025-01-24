import { useState } from 'react'
import { Header, Subtext, Text } from '../../ATEC UI/Text'
import ShipmentDetails from './ShipmentDetails'
import ConfirmShipmentButton from './ConfirmButton'
import ATECButton from '../../ATEC UI/Button'
import { NewShipmentType } from '../../../types/shipment'
import ReceivingShipmentTable from './ReceivingShipmentTable'
import { Button, styled } from '@mui/material'
import DownloadFile from '../../DownloadFile'

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
  const [shipment, setShipment] = useState<NewShipmentType | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) {
      console.log("Error: Couldn't read the file.")
      return
    }

    const reader = new FileReader()

    /*reader.onload = (event) => {
      const content = event.target?.result as string
      parseShipment(content)
    }*/

    const file = event.target.files[0]
    setFile(file)
    reader.readAsText(file)
  }

  /*const getDetails = (rows: string[][]) => {
    const direction: ShipmentDirectionEnum = ShipmentDirectionEnum.In

    const manufacturerName = rows[1][0]?.trim()

    const projectNumber: number = parseInt(rows[1][1]?.trim())
    const projectName: string = rows[1][2]?.trim()

    const receivedDate = new Date(rows[1][3]?.trim())

    const manufacturer: NewManufacturerType = {
      name: manufacturerName,
    }

    const project: NewProjectType = {
      number: projectNumber,
      name: projectName,
    }

    if (!project || !manufacturer || !receivedDate) {
      console.error('Error: Missing details in the shipment')
      return null
    }

    return {
      direction,
      manufacturer,
      project,
      receivedDate,
    }
  }

  const getMaterial = (row: string[], manufacturer: NewManufacturerType) => {
    const name = row[0]?.trim()
    const divisionNumber = isNaN(parseInt(row[1]?.trim()))
      ? undefined
      : parseInt(row[1]?.trim())
    const divisionName = row[2]?.trim()

    if (!name || !divisionNumber || !divisionName) {
      return
    }

    const division: NewDivisionType = {
      number: divisionNumber,
      name: divisionName,
    }

    const material: NewMaterialType = {
      name,
      manufacturer,
      division,
    }

    return material
  }

  const getCrates = (rows: string[][], details: any) => {
    const materialRows = rows.slice(4)

    let crates: NewCrateType[] = []

    materialRows.map((row) => {
      const material = getMaterial(row, details.manufacturer)

      let crateColumnIndex = 12

      while (
        row[crateColumnIndex]?.trim() !== undefined &&
        row[crateColumnIndex]?.trim() !== ''
      ) {
        const crateNumber = row[crateColumnIndex]?.trim()
        const quantity = parseInt(row[crateColumnIndex - 1]?.trim() || '0', 10)

        if (!material) break

        const stock: NewStockType = { material, quantity }

        // Add stock to existing crate or create a new crate
        if (crates.find((crate) => crate.number === crateNumber)) {
          const crate = crates.find((crate) => crate.number === crateNumber)
          crate?.stock.push(stock)
        } else {
          crates.push({
            number: crateNumber,
            location: CrateLocationEnum.ShippingBay,
            project: details.project,
            manufacturer: details.manufacturer,
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
    const preprocessedData = preprocessCSV(data)

    Papa.parse(preprocessedData, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as string[][]

        const details = getDetails(rows)
        if (!details) {
          return
        }

        const crates: NewCrateType[] | null = getCrates(rows, details)
        if (!crates) {
          return
        }

        setShipment({ ...details, crates })
      },
      error: (error: unknown) => {
        console.error('Error parsing CSV:', error)
      },
    })
  }*/

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
                header={'No shipment?'}
                file={{
                  path: '/files/Shipping Template.xlsx',
                  name: 'Shipping Template.xlsx',
                }}
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
