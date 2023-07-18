import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

interface navbarSliceProps {
    state: number;
    settingsOpatcity: number;
}

const initialState: navbarSliceProps = {
    state: 0,
    settingsOpatcity: 1,
};

export const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        changeNavbarState: (state, action: PayloadAction<number>) => {
            state.state = action.payload;
        },
        changesettingsOpatcity: (state, action: PayloadAction<number>) => {
            state.settingsOpatcity = action.payload;
        },
    },
});

export const { changeNavbarState, changesettingsOpatcity } =
    navbarSlice.actions;
export const selectNavbar = (state: RootState) => state.navbar;

export default navbarSlice.reducer;
