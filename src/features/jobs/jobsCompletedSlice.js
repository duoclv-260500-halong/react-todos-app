import { createSlice } from "@reduxjs/toolkit";

const initialJobsCompleted = {
    value: 0
}

export const jobsCompletedSlice = createSlice({
    name: 'jobsCompleted',
    initialState: initialJobsCompleted,
    reducers: {
        getJobsCompleted: (state, action) => {
            state.value = action.payload.value
        },
        incrementedCompleted: (state) => {
            state.value += 1
        },
        decrementedCompleted: (state) => {
            state.value -= 1
        },
        completedAll: (state, action) => {
            const value = action.payload.value
            state.value = value;
        },
        allOutCompleted: (state) => {
            state.value = 0
        }
    }
})

export const {getJobsCompleted, incrementedCompleted, decrementedCompleted, completedAll, allOutCompleted} = jobsCompletedSlice.actions;
export default jobsCompletedSlice.reducer;