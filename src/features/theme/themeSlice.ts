import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {  storeThemeInLocalStorage } from "../../app/handlingDatabase";
import { changeBackground } from "../background/backgroundSlice";

export interface themeSliceProps {
    backgroundType: "image" | "video" | "color" | "gradient";
    backgroundValue: string;
    backgroundBlur: string;
    textColor: string;
    primaryColor: string;
    borderColor: string;
    borderRadius: string;
    navBlur: string;
    fontFamily: string;
    utilityIsActive: boolean;
    backgroundColor: string;
    displaySetting: boolean;
    utilityIsDateActive: boolean;
    utilityIsTimeActive: boolean;
    fontSize: number;
    
}

export const initialState: themeSliceProps = {
    backgroundType: "color",
    backgroundValue: "#ffffff",
    backgroundBlur: "0",
    utilityIsActive: true,
    textColor: "#ffffff",
    primaryColor: "#7C81E3",
    borderColor: "#808080",
    borderRadius: "10",
    navBlur: "10",
    fontFamily: `Dancing+Script`,
    backgroundColor: "#333333",
    displaySetting: true,
    utilityIsDateActive: true,
    utilityIsTimeActive: true,
    
    fontSize: 20,
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<themeSliceProps>) => {
            storeThemeInLocalStorage(action.payload);
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
            state.utilityIsActive = action.payload.utilityIsActive;
            state.displaySetting = action.payload.displaySetting;
            state.utilityIsDateActive = action.payload.utilityIsDateActive;
            state.utilityIsTimeActive = action.payload.utilityIsTimeActive;
        },
    },
});

export const { changeTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
