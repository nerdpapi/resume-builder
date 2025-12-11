// src/components/ResumePreview.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Chip, Stack, Avatar } from "@mui/material";

/**
 * ResumePreview
 * - If `data` prop is provided, renders that data (useful for saved resumes)
 * - Otherwise reads the current resume from Redux (useful in the editor)
 *
 * Props:
 *   - data?: { personalInfo, workExperience, education, skills }
 *   - template?: templateObject (overrides selected template)
 */
export default function ResumePreview({ data = null, template: propTemplate = null }) {
  // live state (only used if data === null)
  const resumeState = useSelector((state) => state.resume);
  const templatesState = useSelector((state) => state.templates);

  // choose source: passed data wins, otherwise redux state
  const {
    personalInfo = {},
    workExperience = [],
    education = [],
    skills = [],
  } = data || resumeState || {};

  // derive primary job title from first experience, or fallback to personalInfo.title or a default
  const primaryJobTitle =
    (workExperience && workExperience.length > 0 && (workExperience[0].role || workExperience[0].title)) ||
    personalInfo.title

  // template selection: propTemplate wins, else use current selected template in redux
  const template =
    propTemplate ||
    (templatesState &&
      templatesState.templates &&
      templatesState.templates.find((t) => t.id === templatesState.selectedTemplateId)) ||
    (templatesState && templatesState.templates && templatesState.templates[0]) ||
    {};

  const accent = template.primaryColor || "#1976d2";
  const headerVariant = template.headerVariant || "strip-top";

  // initials fallback
  const initials =
    (personalInfo.fullName &&
      personalInfo.fullName
        .split(" ")
        .map((p) => p[0])
        .join("")
        .toUpperCase()) ||
    "CC";

  const CircleAvatar = ({ inverted = false }) => (
    <Box
      sx={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        fontWeight: 700,
        bgcolor: inverted ? "#fff" : accent,
        color: inverted ? accent : "#fff",
        flexShrink: 0,
      }}
    >
      {initials}
    </Box>
  );

  const PhotoOrCircle = ({ inverted = false, withBorder = false }) =>
    personalInfo.photo ? (
      <Avatar
        src={personalInfo.photo}
        alt="Profile"
        sx={{
          width: 70,
          height: 70,
          borderRadius: "50%",
          border: withBorder ? `3px solid ${inverted ? "#fff" : accent}` : 0,
        }}
      />
    ) : (
      <CircleAvatar inverted={inverted} />
    );

  const renderHeader = () => {
    switch (headerVariant) {
      case "strip-top":
        return (
          <>
            <Box sx={{ height: 32, bgcolor: accent, borderRadius: 0, mb: 1.5 }} />
            <Box
              sx={{
                pb: 2,
                mb: 2,
                borderBottom: `4px solid ${accent}`,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <PhotoOrCircle withBorder />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {personalInfo.fullName || "Chris Candidate"}
                </Typography>
                <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                  {primaryJobTitle}
                </Typography>
                <Typography variant="body2">
                  {personalInfo.email && `${personalInfo.email} • `}
                  {personalInfo.mobile || personalInfo.phone}
                </Typography>
                {personalInfo.address && (
                  <Typography variant="body2">{personalInfo.address}</Typography>
                )}
              </Box>
            </Box>
          </>
        );

      case "title-left-line":
        return (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <PhotoOrCircle withBorder />
              <Box>
                <Typography sx={{ fontSize: 28, fontWeight: 700, color: accent }}>
                  {personalInfo.fullName || "Chris Candidate"}
                </Typography>
                <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                  {primaryJobTitle}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ height: 3, width: "55%", bgcolor: accent, borderRadius: 0, mb: 1 }} />
            <Typography sx={{ fontSize: 13 }}>
              {personalInfo.email && `${personalInfo.email} • `}
              {personalInfo.mobile || personalInfo.phone}
            </Typography>
            {personalInfo.address && <Typography sx={{ fontSize: 13 }}>{personalInfo.address}</Typography>}
          </Box>
        );

      case "solid-block":
        return (
          <Box sx={{ mb: 2, borderRadius: 0, overflow: "hidden" }}>
            <Box sx={{ bgcolor: accent, color: "#fff", px: 3, py: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
              <PhotoOrCircle inverted />
              <Box>
                <Typography sx={{ fontSize: 26, fontWeight: 700, letterSpacing: 1 }}>
                  {(personalInfo.fullName || "Chris Candidate").toUpperCase()}
                </Typography>
                
                <Typography sx={{ fontSize: 13, textTransform: "uppercase" }}>{primaryJobTitle}</Typography>
                <Typography sx={{ fontSize: 12, mt: 0.5 }}>
                  {personalInfo.email && `${personalInfo.email} • `}
                  {personalInfo.mobile || personalInfo.phone}
                </Typography>
              </Box>
            </Box>

            {personalInfo.address && (
              <Box sx={{ px: 3, py: 1.5, border: `1px solid ${accent}` }}>
                <Typography sx={{ fontSize: 12 }}>{personalInfo.address}</Typography>
              </Box>
            )}
          </Box>
        );

      case "thin-rule":
      default:
        return (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ height: 4, bgcolor: accent, borderRadius: 0, mb: 1.5 }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PhotoOrCircle withBorder />
              <Box>
                <Typography sx={{ fontSize: 26, fontWeight: 700, letterSpacing: 0.5 }}>
                  {personalInfo.fullName || "Chris Candidate"}
                </Typography>
                <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                  {primaryJobTitle}
                </Typography>
                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                  {personalInfo.email && `${personalInfo.email} • `}
                  {personalInfo.mobile || personalInfo.phone}
                </Typography>
                {personalInfo.address && <Typography sx={{ fontSize: 13 }}>{personalInfo.address}</Typography>}
              </Box>
            </Box>
          </Box>
        );
    }
  };

  const sectionTitleStyle = headerVariant === "solid-block" ? { textTransform: "uppercase", letterSpacing: 0.8 } : {};

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        id="resume-preview"
        sx={{
          width: "100%",
          border: "none",
          borderRadius: 0,
          backgroundColor: "#ffffff",
          fontFamily: '"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {renderHeader()}

        {personalInfo.objective || personalInfo.summary ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: accent, fontSize: 18, p: 2, fontWeight: 600, ...sectionTitleStyle }}>
              {headerVariant === "solid-block" ? "Profile" : "Summary"}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {personalInfo.objective || personalInfo.summary}
            </Typography>
          </Box>
        ) : null}

        {workExperience && workExperience.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: accent, fontSize: 18, p: 2, fontWeight: 600, mb: 1, ...sectionTitleStyle }}>
              {headerVariant === "solid-block" ? "Professional Experience" : "Work Experience"}
            </Typography>

            {workExperience.map((job, index) => {
              const start = job.startYear || job.startDate;
              const end = job.endYear || job.endDate;
              return (
                <Box key={index} sx={{ mb: 1.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, p: 2 }}>
                    {job.role || "Role"} – {job.company || "Company"}
                  </Typography>

                  {(start || end) && (
                    <Typography variant="caption" sx={{ display: "block", mb: 0.5, p: 2 }}>
                      {start || ""} {start || end ? "–" : ""} {end || ""}
                    </Typography>
                  )}

                  {job.description && <Typography variant="body2">{job.description}</Typography>}
                </Box>
              );
            })}
          </Box>
        )}

        {education && education.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: accent, fontSize: 18, p: 2, fontWeight: 600, mb: 1, ...sectionTitleStyle }}>
              Education
            </Typography>

            {education.map((ed, index) => (
              <Box key={index} sx={{ mb: 1.5, p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {ed.degree || "Degree"}
                </Typography>
                <Typography variant="body2">{ed.institution || "Institution"}</Typography>

                {(ed.startYear || ed.endYear) && (
                  <Typography variant="caption">
                    {ed.startYear || ""} {ed.startYear || ed.endYear ? "–" : ""} {ed.endYear || ""}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        )}

        {skills && skills.length > 0 && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ color: accent, fontSize: 18, p: 2, fontWeight: 600, mb: 1, ...sectionTitleStyle }}>
              {headerVariant === "solid-block" ? "Key Skills" : "Skills"}
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={1} p={2}>
              {skills.map((skill, index) => (
                <Chip key={index} label={skill} variant="outlined" />
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
}
