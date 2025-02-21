import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectType } from '../types/project'

// Explicitly define the initial state type
const initialState = null as ProjectType | null

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (_state, action: PayloadAction<ProjectType | null>) => {
      return action.payload
    },
  },
})

export const { setProject } = projectSlice.actions
export default projectSlice.reducer
