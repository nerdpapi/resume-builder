// src/components/MiniThumbnail.jsx
import React from "react";
import { Box } from "@mui/material";
import ResumePreview from "./ResumePreview";

/**
 * MiniThumbnail renders a scaled down preview of a saved resume.
 * Props:
 *  - saved: saved resume object (with .data)
 *  - template: optional template object
 */
export default function MiniThumbnail({ saved, template }) {
  if (!saved) return null;

  // saved.data should be { personalInfo, workExperience, education, skills }
  return (
    <Box
  sx={{
    transform: "scale(1)",
    transformOrigin: "top left",
    pointerEvents: "none",
    display: "inline-block",
  }}
>
  <ResumePreview data={saved.data} template={template} />
</Box>

  );
}
