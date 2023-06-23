import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface BackgroundState {
    type: "image" | "video" | "color" | "gradient";
    value: string;
}

const initialState: BackgroundState = {
    type: "color",
    value: "#ccffcc",
};

export const backgroundSlice = createSlice({
    name: "background",
    initialState,
    reducers: {
        addNewBackground: (state, action: PayloadAction<BackgroundState>) => {
            state.type = action.payload.type;
            state.value = action.payload.value;
        }
    }
});

export const { addNewBackground } = backgroundSlice.actions;

export const selectBackground = (state: RootState) => state.background;

export default backgroundSlice.reducer;