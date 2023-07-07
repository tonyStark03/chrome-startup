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
    backgroundColor: string;
    displaySetting: boolean;
}

const initialState: themeSliceProps = {
    backgroundType: "color",
    backgroundValue: "#ffffff",
    backgroundBlur: "0",
    textColor: "#ffffff",
    primaryColor: "#c40042",
    borderColor: "#808080",
    borderRadius: "10",
    navBlur: "10",
    fontFamily: `Regular`,
    backgroundColor: "#333333",
    displaySetting: true,
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
        },
    },
});

export const { changeTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
