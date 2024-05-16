import { configureStore } from "@reduxjs/toolkit";
import furnitureReducer from "../features/furniture/furnitureSlice";
import contractorReducer from "../features/contractor/contractorSlice";

export const store = configureStore({
  reducer: {
    furniture: furnitureReducer,
    contractor: contractorReducer,
  },
});
