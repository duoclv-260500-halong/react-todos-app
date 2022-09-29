import {createSlice} from '@reduxjs/toolkit'

const initialJobsActive = {
    value: 0
}

export const jobsActiveSlide = createSlice({
    name: 'jobsActive',
    initialState: initialJobsActive,
    reducers: {
        getJobsActive: (state, action) => {
            state.value = action.payload.value
        },
        incrementedActive: (state) => {
            state.value += 1;
        },
        decrementedActive: (state) => {
            state.value -= 1;
        },
        activeAll: (state, action) => {
            state.value = action.payload.value
        },
        allOutActive: (state) => {
            state.value = 0;
        }
    }
})

export const {getJobsActive, incrementedActive, decrementedActive, allOutActive, activeAll} = jobsActiveSlide.actions;
export default jobsActiveSlide.reducer