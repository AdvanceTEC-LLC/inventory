import Button from '@mui/material/Button'
import { Header } from '../../ATEC UI/Text'

interface DownloadFileProps {
  path: string
  name: string
}

const DownloadFile = ({ path, name }: DownloadFileProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <Header text="No shipment?" />
      <a href={path} download={name}>
        <Button variant="outlined">Download Template</Button>
      </a>
    </div>
  )
}

export default DownloadFile
