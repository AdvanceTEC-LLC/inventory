import { Autocomplete, Button, TextField } from '@mui/material'
import { useAssemblies } from '../../../hooks/useAssembliesHook'
import { useEffect, useState } from 'react'
import { AssemblyType } from '../../../types/assembly'
import { Stack } from '@mui/system'
import { AssemblyCrateType } from '../../../types/assemblyCrate'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../../reducers/notificationsReducer'
import assemblyCrateAssembliesService from '../../../services/assemblyCrateAssembliesService'
import { AppDispatch } from '../../../store'
import { NewAssemblyCrateAssemblyType } from '../../../types/assemblyCrateAssembly'
import { useAssemblyCrates } from '../../../hooks/useAssemblyCratesHook'

interface AddAssemblyToCrateProps {
  assemblyCrate: AssemblyCrateType
}

const AddAssemblyToCrate = ({ assemblyCrate }: AddAssemblyToCrateProps) => {
  const [assembly, setAssembly] = useState<AssemblyType | null>()
  const [filteredAssemblies, setFilteredAssemblies] = useState<AssemblyType[]>(
    []
  )

  const { data: assemblies = [], isLoading, error } = useAssemblies()
  const { data: assemblyCrates = [] } = useAssemblyCrates()

  useEffect(() => {
    setFilteredAssemblies(
      assemblies
        .filter(
          (a) =>
            a.project.id === assemblyCrate.crate.project.id && !a.prefabricated
        )
        .filter(
          (a) =>
            !assemblyCrates.some((aCrate) =>
              aCrate.assemblies.some((aa) => a.id === aa.id)
            )
        )
    )
  }, [assemblies, assemblyCrate])

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createAssemblyCrateAssemblyMutation = useMutation({
    mutationFn: (assemblyCrateAssembly: NewAssemblyCrateAssemblyType) =>
      assemblyCrateAssembliesService.create(assemblyCrateAssembly),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['assemblyCrates'] })
      await queryClient.invalidateQueries({ queryKey: ['crates'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
    },
    onError: (error) => {
      const { name, message } = error
      dispatch(
        notifyWithTimeout({
          title: name,
          message: message,
          status: 'error',
        })
      )
    },
  })

  const handleSubmit = () => {
    if (!assembly) return

    const assemblyCrateAssembly = {
      assemblyCrateId: assemblyCrate.id,
      assemblyId: assembly.id,
    }

    createAssemblyCrateAssemblyMutation.mutate(assemblyCrateAssembly)

    setAssembly(null)
  }

  return (
    <Stack spacing={2} sx={{ marginTop: 1 }}>
      <Autocomplete
        options={filteredAssemblies}
        getOptionLabel={(option) => option.code}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={assembly ?? null}
        onChange={(_event, newValue) => {
          setAssembly(newValue)
        }}
        renderInput={(params) => <TextField {...params} label="Assembly" />}
        noOptionsText={
          isLoading
            ? 'Loading...'
            : error
            ? 'Error fetching data'
            : `No assemblies available`
        }
      />
      <Button
        disabled={!assembly}
        onClick={handleSubmit}
        loading={createAssemblyCrateAssemblyMutation.isPending ? true : null}
      >
        Add Assembly To Crate
      </Button>
    </Stack>
  )
}

export default AddAssemblyToCrate
