import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface viewBackgroundState {
    active:boolean,
    type: "image" | "video" | "color" | "gradient",
    value:string,
}

const initialState: viewBackgroundState = {
    active:false,
    type: "color",
    value: "#000",
};

export const viewBackgroundSlice = createSlice({
    name: "viewBackground",
    initialState,
    reducers: {
        changeViewBackground: (state, action: PayloadAction<viewBackgroundState>) => {
            state.active = action.payload.active;
            state.type = action.payload.type;
            state.value = action.payload.value;
            
        }
    },
});

export const { changeViewBackground } = viewBackgroundSlice.actions;
export const selectViewBackground = (state: RootState) => state.viewBackground;
export default viewBackgroundSlice.reducer;