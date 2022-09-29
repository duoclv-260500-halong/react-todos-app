import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from '../features/jobs/jobsSlice'
import jobsActiveReducer from '../features/jobs/jobsActiveSlice'
import jobsCompletedSlice from '../features/jobs/jobsCompletedSlice'

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    jobsActive: jobsActiveReducer,
    jobsCompleted: jobsCompletedSlice
  },
})