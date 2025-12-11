import { configureStore } from "@reduxjs/toolkit";
import templatesReducer from "./slices/templatesSlice.js";
import resumeReducer from "./slices/resumeSlice.js";
import savedResumesReducer from "./slices/savedResumesSlice.js";
export const store = configureStore({
  reducer: {
    templates: templatesReducer,
    resume: resumeReducer,
    savedResumes: savedResumesReducer,
  },
});
