import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    photo: null, 
  },
  workExperience: [
    // {company, role, startDate, endDate, description}
  ],
  education: [
    // {degree, institution, startYear, endYear}
  ],
  skills: [],
  resumeName: "",
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setPersonalInfo(state, action) {
      state.personalInfo = action.payload;
    },
    setWorkExperience(state, action) {
      state.workExperience = action.payload;
    },
    setEducation(state, action) {
      state.education = action.payload;
    },
    setSkills(state, action) {
      state.skills = action.payload;
    },
    setResumeName(state, action) {
      state.resumeName = action.payload;
    },
    resetResume(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setPersonalInfo,
  setWorkExperience,
  setEducation,
  setSkills,
  setResumeName,
  resetResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
