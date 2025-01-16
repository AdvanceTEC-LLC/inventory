import { useQuery } from '@tanstack/react-query'
import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'

interface FetchAutocompleteProps<T> {
  setFilter: (filter: T | null) => void
  service: {
    getAll: () => Promise<T[]> // Updated to support async service calls
  }
  queryKey: string
  label: string
  getOptionLabel: (option: T) => string // Custom option display
  isOptionEqualToValue: (option: T, value: T) => boolean // Equality check
}

const FetchAutocomplete = <T extends unknown>({
  setFilter,
  service,
  queryKey,
  label,
  getOptionLabel,
  isOptionEqualToValue,
}: FetchAutocompleteProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null)

  const {
    data: options = [],
    isLoading,
    isError,
  } = useQuery<T[]>({
    queryKey: [queryKey],
    queryFn: service.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return (
    <Autocomplete
      fullWidth
      options={options}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      value={selectedItem}
      onChange={(_event, newValue) => {
        setFilter(newValue)
        setSelectedItem(newValue)
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      noOptionsText={
        isLoading
          ? 'Loading...'
          : isError
          ? 'Error fetching data'
          : `No ${label.toLowerCase()} available`
      }
    />
  )
}

export default FetchAutocomplete
