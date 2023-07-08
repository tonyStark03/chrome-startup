import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
export interface BackgroundState {
    type: "image" | "video" | "color" | "gradient";
    value: string;
}

const initialState: BackgroundState = {
    type: "gradient",
    value: "#6D92CA-#A22AEE",
};

export const backgroundSlice = createSlice({
    name: "background",
    initialState,
    reducers: {
        changeBackground: (state, action: PayloadAction<BackgroundState>) => {
            state.type = action.payload.type;
            state.value = action.payload.value;
        },
    },
});

export const { changeBackground } = backgroundSlice.actions;

export const selectBackground = (state: RootState) => state.background;

export default backgroundSlice.reducer;
