import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PhieuNhapService from "../../services/PhieuNhapService.js"

export const fetchAllPhieuNhap = createAsyncThunk(
    'phieunhap/fetchAllPhieuNhap',
    async () => {
        const response = await PhieuNhapService.getListPhieuNhap();
        return response.data;
    }
)
const initialState = {
    listPhieuNhap: [],
    isLoading: false,
    isError: false
}
export const phieunhapSlice = createSlice({
    name: 'phieunhap',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPhieuNhap.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllPhieuNhap.fulfilled, (state, action) => {
                state.listPhieuNhap = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllPhieuNhap.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
    }
})

export default phieunhapSlice.reducer