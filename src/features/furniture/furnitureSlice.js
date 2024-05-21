import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import furnitureService from "./furnitureService";
import { toast } from "react-toastify";

function errorService(error) {
  let errorMessage = "An unknown error occurred."; // Default message
  if (error.response && error.response.data && error.response.data.message) {
    errorMessage = error.response.data.message; // Extract server error if available
  } else if (error.message) {
    errorMessage = error.message; // Generic error message
  }

  return errorMessage;
}

const initialState = {
  furnitures: [],
  furniture: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  status: "",
};

export const getFurnitures = createAsyncThunk(
  "furnitures/getAll",
  async (_, thunkAPI) => {
    try {
      return await furnitureService.getFurnitures();
    } catch (error) {
      let errorMessage = errorService(error);
      toast.error(errorMessage); // Display the error toast immediately
      return thunkAPI.rejectWithValue(errorMessage); // Pass the error message
    }
  }
);

export const getSingleFurniture = createAsyncThunk(
  "furnitures/getFurniture",
  async (slug, thunkAPI) => {
    try {
      return await furnitureService.getSingleFurniture(slug);
    } catch (error) {
      let errorMessage = errorService(error);
      toast.error(errorMessage); // Display the error toast immediately
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const furnitureSlice = createSlice({
  name: "furnitures",
  initialState,
  reducers: {
    furnitureReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFurnitures.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(getFurnitures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.furnitures = action.payload;
        state.status = "idle";
      })
      .addCase(getFurnitures.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = "error";
      })
      .addCase(getSingleFurniture.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(getSingleFurniture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.furniture = action.payload;
        state.status = "idle";
      })
      .addCase(getSingleFurniture.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = "error";
      });
  },
});

export const { furnitureReset } = furnitureSlice.actions;
export default furnitureSlice.reducer;
