import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState: {},
    reducers: {
        setPurchase: (state, action: PayloadAction<any>) => {
            Object.assign(state, action.payload)
        }
    },
})

export const { setPurchase } = purchaseSlice.actions
// Action creators are generated for each case reducer function
export default purchaseSlice.reducer