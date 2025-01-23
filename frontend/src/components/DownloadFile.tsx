import Button from '@mui/material/Button'
import { Header } from './ATEC UI/Text'

interface DownloadFileProps {
  header: string
  file: {
    path: string
    name: string
  }
}

const DownloadFile = ({ header, file }: DownloadFileProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <Header text={header} />
      <a href={file.path} download={file.name}>
        <Button variant="outlined">Download Template</Button>
      </a>
    </div>
  )
}

export default DownloadFile
