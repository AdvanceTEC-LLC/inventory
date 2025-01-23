import { useState } from 'react'

// Parsing
import Papa from 'papaparse'

// Styled Components
import { Header, Subtext, Text } from '../../ATEC UI/Text'

import ATECButton from '../../ATEC UI/Button'
import { CreateAssemblyType } from '../../../types/assembly'
import { CreateProjectType } from '../../../types/project'
import { CreateStockType } from '../../../types/stock'
import { useQuery } from '@tanstack/react-query'
import { MaterialType } from '../../../types/material'
import materialsService from '../../../services/materialsService'
import ContentsTable from './ContentsTable'
import ConfirmAssembliesButton from './ConfirmAssembliesButton'
import DownloadFile from '../../DownloadFile'
import { Button, styled } from '@mui/material'

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

const UploadAssemblies = () => {
  const [file, setFile] = useState<File | null>(null)
  const [assemblies, setAssemblies] = useState<CreateAssemblyType[] | null>(
    null
  )
  const [project, setProject] = useState<CreateProjectType>()

  const {
    data: materials = [],
    isLoading: isLoading,
    isError: isError,
  } = useQuery<MaterialType[]>({
    queryKey: ['materials'],
    queryFn: materialsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) {
      console.log("Error: Couldn't read the file.")
      return
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      const content = event.target?.result as string
      parseAssemblies(content)
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

  const getProject = (rows: string[][]): CreateProjectType => {
    const projectNumber: number = parseInt(rows[1][0]?.trim())
    const projectName: string = rows[1][1]?.trim()

    const parsedProject: CreateProjectType = {
      number: projectNumber,
      name: projectName,
    }

    setProject(parsedProject)

    return parsedProject
  }

  const getAssemblies = (
    rows: string[][],
    parsedProject: CreateProjectType
  ) => {
    const assemblyRows = rows.slice(4)

    let parsedAssemblies: CreateAssemblyType[] = []

    assemblyRows.map((row) => {
      const identifier = row[0]?.trim()

      if (!identifier) return

      let assembly: CreateAssemblyType = {
        identifier,
        project: parsedProject,
        billOfMaterials: [],
      }

      let materialColumnIndex = 1

      while (
        row[materialColumnIndex]?.trim() !== undefined &&
        row[materialColumnIndex]?.trim() !== ''
      ) {
        const partNumber = row[materialColumnIndex]?.trim()
        const quantity = parseInt(
          row[materialColumnIndex + 1]?.trim() || '0',
          10
        )

        const material = materials.find(
          (material) => material.partNumber === partNumber
        )

        if (!material) {
          throw new Error('No material')
        }

        const stock: CreateStockType = { material, quantity }

        assembly.billOfMaterials.push(stock)

        materialColumnIndex += 2
      }

      parsedAssemblies.push(assembly)
    })

    if (!parsedAssemblies) {
      console.error('Error: No assemblies found')
      return null
    }

    console.log(parsedAssemblies)

    return parsedAssemblies
  }

  const parseAssemblies = (data: string) => {
    const preprocessedData = preprocessData(data)

    Papa.parse(preprocessedData, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as string[][]

        const parsedProject = getProject(rows)

        const parsedAssemblies = getAssemblies(rows, parsedProject)
        if (!parsedAssemblies) {
          return
        }

        setAssemblies(parsedAssemblies)
      },
      error: (error: unknown) => {
        console.error('Error parsing CSV:', error)
      },
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data.</div>
  }

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-8 md:grid md:grid-cols-[1fr_1fr] md:gap-x-8">
        <div className="flex flex-col gap-y-2">
          <Header text="Upload Assemblies" />

          {file && assemblies ? (
            <div>
              <div className="flex flex-col gap-y-2">
                <Text text={file.name} />
                <ATECButton
                  type="reset"
                  text="Remove file"
                  onClick={() => {
                    setFile(null)
                    setAssemblies(null)
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
                <Subtext text="Upload a .csv file using the assemblies template" />
              </div>

              <DownloadFile
                header={'No Assemblies?'}
                file={{
                  path: '/files/Assemblies Template.xlsx',
                  name: 'Assemblies Template.xlsx',
                }}
              />
            </div>
          )}
        </div>
        {project && (
          <div className="flex flex-col gap-y-2">
            <Header text="Upload Details" />

            <div className="grid grid-cols-[1fr_1fr] gap-x-4">
              <Text text="Project" />
              <Text text={`${project?.number} ${project?.name}`} />
            </div>
          </div>
        )}
      </div>

      {assemblies && (
        <div className="flex flex-col gap-y-8">
          <ContentsTable assemblies={assemblies} />
          <ConfirmAssembliesButton assemblies={assemblies} />
        </div>
      )}
    </div>
  )
}

export default UploadAssemblies
