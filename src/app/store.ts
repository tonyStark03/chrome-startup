import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import backgroundReducer from "../features/background/backgroundSlice";
import themeReducer from "../features/theme/themeSlice"
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        background: backgroundReducer,
        theme: themeReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
