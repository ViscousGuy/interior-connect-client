import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contractorService from "./contractorService";
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
  contractors: [],
  contractor: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  status: "",
};

export const getContractors = createAsyncThunk(
  "contractors/getAll",
  async (_, thunkAPI) => {
    try {
      return await contractorService.getContractors();
    } catch (error) {
      let errorMessage = errorService(error);
      toast.error(errorMessage); // Display the error toast immediately
      return thunkAPI.rejectWithValue(errorMessage); // Pass the error message
    }
  }
);

export const getSingleContractor = createAsyncThunk(
  "contractors/getContractor",
  async (slug, thunkAPI) => {
    try {
      return await contractorService.getSingleContractor(slug);
    } catch (error) {
      let errorMessage = errorService(error);
      toast.error(errorMessage); // Display the error toast immediately
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const contractorSlice = createSlice({
  name: "contractors",
  initialState,
  reducers: {
    contractorReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContractors.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(getContractors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contractors = action.payload;
        state.status = "idle";
      })
      .addCase(getContractors.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = "error";
        toast.error(state.status);
      })
      .addCase(getSingleContractor.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(getSingleContractor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contractor = action.payload;
        state.status = "idle";
      })
      .addCase(getSingleContractor.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = "error";
        toast.error(state.status);
      });
  },
});

export const { contractorReset } = contractorSlice.actions;
export default contractorSlice.reducer;
