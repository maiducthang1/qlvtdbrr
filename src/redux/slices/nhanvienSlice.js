import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import NhanVienService from '../../services/NhanVienService'

export const fetchAllNhanVien = createAsyncThunk(
    'nhanvien/fetchAllNhanVien',
    async () => {
        const response = await NhanVienService.getListNhanVien();
        return response.data;
    }
)
const initialState = {
    listNhanVien: [],
    isLoading: false,
    isError: false
}
export const nhanvienSlice = createSlice({
    name: 'nhanvien',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllNhanVien.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllNhanVien.fulfilled, (state, action) => {
                state.listNhanVien = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllNhanVien.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
    }
})

export default nhanvienSlice.reducer