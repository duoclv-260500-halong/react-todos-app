import { createSlice } from '@reduxjs/toolkit'

const initialJobs = {
    jobs: JSON.parse(localStorage.getItem('react-todos')) || []
}

export const jobsSlice = createSlice({
    name: 'jobs',
    initialState: initialJobs,
    reducers: {
        addJob: (state, action) => {
            const clone = [...state.jobs];
            clone.push(action.payload)
            state.jobs = clone
        },
        editJob: (state, action) => {
            const clone = [...state.jobs];
            const index = action.payload.index;
            const value = action.payload.value;
            clone[index].value = value
            state.jobs = clone
        },
        deleteJob: (state, action) => {
            const clone = [...state.jobs]
            clone.splice(action.payload, 1)
            state.jobs = clone
        },
        editStatusJob: (state, action) => {
            const clone = [...state.jobs]
            const index = action.payload.index
            const status = action.payload.status;
            clone[index].status = status === 'active' ? 'completed' : 'active'
            state.jobs = clone
        },
        allToCompleted: (state, action) => {
            console.log('to complete all')
            const clone = [...state.jobs]
            clone.map((job, index) => {
                return job.status = 'completed'
            })
            state.jobs = clone
        },
        allToActive: (state, action) => {
            const clone = [...state.jobs]
            clone.map((job, index) => {
                return job.status = 'active'
            })
            state.jobs = clone
        },
        destroyAllJobsCompleted: (state) => {
            const clone = [...state.jobs]
            const removed = clone.filter((job) => {
                return job.status !== 'completed'
            })
            state.jobs = removed
        }
    }
})

// Action creators are generated for each case reducer function

export const { addJob, editJob, deleteJob, editStatusJob, allToCompleted, allToActive, destroyAllJobsCompleted } = jobsSlice.actions

export default jobsSlice.reducer