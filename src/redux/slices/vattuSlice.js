import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import VatTuService from "../../services/VatTuService"

export const fetchAllVatTu = createAsyncThunk(
    'vattu/fetchAllVatTu',
    async () => {
        const response = await VatTuService.getListVatTu();
        return response.data;
    }
)
const initialState = {
    listVatTu: [],
    isLoading: false,
    isError: false
}
export const vattuSlice = createSlice({
    name: 'vattu',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllVatTu.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllVatTu.fulfilled, (state, action) => {
                state.listVatTu = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllVatTu.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
    }
})

export default vattuSlice.reducer