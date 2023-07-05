import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import backgroundReducer from "../features/background/backgroundSlice";
import themeReducer from "../features/theme/themeSlice"
import  navbarReducer  from "../features/Applicaiton/navbarSlice";
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        background: backgroundReducer,
        theme: themeReducer,
        navbar:navbarReducer
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
