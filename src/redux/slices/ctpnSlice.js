import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CTPNService from "../../services/CTPNService"

export const fetchAllCTPN = createAsyncThunk(
    'vattu/fetchAllCTPN',
    async () => {
        const response = await CTPNService.getListCTPN();
        return response.data;
    }
)
const initialState = {
    listCTPN: [],
    isLoading: false,
    isError: false
}
export const ctpnSlice = createSlice({
    name: 'vattu',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCTPN.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllCTPN.fulfilled, (state, action) => {
                state.listCTPN = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllCTPN.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
    }
})

export default ctpnSlice.reducer