import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

interface themeSliceProps {
    backgroundType: string;
    backgroundValue: string;
    textColor: string;
    primaryColor: string;
    borderColor: string;
    borderRadius: string;
}

const initialState: themeSliceProps = {
    backgroundType: "color",
    backgroundValue: "#ffffff",
    textColor: "#ffffff",
    primaryColor: "#ffffff",
    borderColor: "#000000",
    borderRadius: "0",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<themeSliceProps>) => {
            state.backgroundType = action.payload.backgroundType;
            state.backgroundValue = action.payload.backgroundValue;
            state.textColor = action.payload.textColor;
            state.primaryColor = action.payload.primaryColor;
            state.borderColor = action.payload.borderColor;
            state.borderRadius = action.payload.borderRadius;
        }
    },
});

export const {changeTheme} = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;


export default themeSlice.reducer;