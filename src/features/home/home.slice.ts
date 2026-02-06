import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
  language: string;
}

const getInitialLanguage = () => "en";

const initialState: HomeState = {
  language: getInitialLanguage(),
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("language", action.payload);
      }
    },
  },
});

export const { setLanguage } = homeSlice.actions;
export default homeSlice.reducer;
