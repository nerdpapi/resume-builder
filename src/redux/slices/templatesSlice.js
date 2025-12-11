import { createSlice } from "@reduxjs/toolkit";
import { templatesData } from "../../data/templatesData";

const templatesSlice = createSlice({
  name: "templates",
  initialState: {
    templates: templatesData,
    selectedTemplateId: null,
  },
  reducers: {
    selectTemplate(state, action) {
      state.selectedTemplateId = action.payload; // template id
    },
  },
});

export const { selectTemplate } = templatesSlice.actions;
export default templatesSlice.reducer;
