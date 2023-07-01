import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

interface themeSliceProps {
    backgroundType: string;
    backgroundValue: string;
    backgroundBlur: string;
    textColor: string;
    primaryColor: string;
    borderColor: string;
    borderRadius: string;
    navBlur: string;
    fontFamily: string;
    backgroundColor: string;
    displaySetting: boolean;
}

const initialState: themeSliceProps = {
    backgroundType: "color",
    backgroundValue: "#ffffff",
    backgroundBlur: "0",
    textColor: "#ffffff",
    primaryColor: "#ffffff",
    borderColor: "#ccffcc",
    borderRadius: "10",
    navBlur: "10",
    fontFamily: `Dancing+Script`,
    backgroundColor: "#ccffcc",
    displaySetting: true,
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<themeSliceProps>) => {
            state.backgroundType = action.payload.backgroundType;
            state.backgroundValue = action.payload.backgroundValue;
            state.backgroundBlur = action.payload.backgroundBlur;
            state.textColor = action.payload.textColor;
            state.primaryColor = action.payload.primaryColor;
            state.borderColor = action.payload.borderColor;
            state.borderRadius = action.payload.borderRadius;
            state.navBlur = action.payload.navBlur;
            state.fontFamily = action.payload.fontFamily;
            state.backgroundColor = action.payload.backgroundColor;
            state.displaySetting = action.payload.displaySetting;
        },
        openSetting: (state) => {
            state.displaySetting = true;
        },
        closeSetting: (state) => {
            state.displaySetting = false;
        }
    },
});

export const { changeTheme,
    openSetting,
    closeSetting
 } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
