// src/redux/slices/savedResumesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "rb_saved_resumes_v1";

const loadInitial = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { list: [] };
    return { list: JSON.parse(raw) || [] };
  } catch (e) {
    console.error("Failed to load saved resumes", e);
    return { list: [] };
  }
};

const saveToStorage = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save resumes", e);
  }
};

const slice = createSlice({
  name: "savedResumes",
  initialState: loadInitial(),
  reducers: {
    addSavedResume(state, action) {
      // payload: { id, name, data: { personalInfo, workExperience, education, skills }, templateId, createdAt }
      state.list.unshift(action.payload);
      saveToStorage(state.list);
    },
    removeSavedResume(state, action) {
      const id = action.payload;
      state.list = state.list.filter((r) => r.id !== id);
      saveToStorage(state.list);
    },
    updateSavedResume(state, action) {
      const { id, updates } = action.payload;
      state.list = state.list.map((r) => (r.id === id ? { ...r, ...updates } : r));
      saveToStorage(state.list);
    },
    clearAllSavedResumes(state) {
      state.list = [];
      saveToStorage(state.list);
    },
  },
});

export const {
  addSavedResume,
  removeSavedResume,
  updateSavedResume,
  clearAllSavedResumes,
} = slice.actions;

export default slice.reducer;
