import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/slices/userSlice";
import mainPageSlice from "@/slices/mainPageSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        mainPage: mainPageSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDisptach = typeof store.dispatch;
