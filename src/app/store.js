import { configureStore } from "@reduxjs/toolkit";
import furnitureReducer from "../features/furniture/furnitureSlice";

export const store = configureStore({
  reducer: {
    furniture: furnitureReducer,
  },
});
