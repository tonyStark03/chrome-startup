import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { storeThemeInLocalStorage } from "../../app/handlingDatabase";
import { changeBackground } from "../background/backgroundSlice";

export interface themeSliceProps {
    backgroundType: "image" | "video" | "color" | "gradient";
    backgroundValue: string;
    backgroundBlur: string;
    fontColor: string;
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
    utilityFontColor: string;
    fontWeight: number;
    isItalic: boolean;
    navbarColor: string;
    separatorColor: string;
    navbarDropdownColor:string;
}

export const initialState: themeSliceProps = {
    backgroundType: "gradient",
    backgroundValue: "#0c4b72-#5a8b6a",
    backgroundBlur: "0",
    utilityIsActive: true,
    fontColor: "#ffffff",
    primaryColor: "#7C81E3",
    borderColor: "#808080",
    borderRadius: "10",
    navBlur: "10",
    fontFamily: `Roboto`,
    backgroundColor: "#333333",
    displaySetting: true,
    utilityIsDateActive: true,
    utilityIsTimeActive: true,
    utilityFontColor: "#ffffff",
    fontWeight: 400,
    isItalic: false,
    navbarColor: "#010101",
    separatorColor: "#ffffff",
    navbarDropdownColor:"#010101"
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
            state.fontColor = action.payload.fontColor;
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
            state.utilityFontColor = action.payload.utilityFontColor;
            state.fontWeight = action.payload.fontWeight;
            state.isItalic = action.payload.isItalic;
            state.navbarColor = action.payload.navbarColor;
            state.separatorColor = action.payload.separatorColor;
            state.navbarDropdownColor = action.payload.navbarDropdownColor;
            
        },
    },
});

export const { changeTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
