import { useState } from "react";
import { Box, Tabs, Tab, Paper, Typography } from "@mui/material";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import WorkExperienceForm from "../components/forms/WorkExperienceForm";
import EducationForm from "../components/forms/EducationForm";
import KeySkillsForm from "../components/forms/KeySkillsForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TabPanel({ value, index, children }) {
  if (value !== index) return null;
  return <Box sx={{ mt: 2 }}>{children}</Box>;
}

export default function DetailsPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const resume = useSelector((state) => state.resume);
  const selectedTemplateId = useSelector(
    (state) => state.templates.selectedTemplateId
  );
  const navigate = useNavigate();

  // If user directly comes here without choosing template
  if (!selectedTemplateId) {
    navigate("/");
  }

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const goNext = () => setTabIndex((prev) => Math.min(prev + 1, 3));
  const goBack = () => setTabIndex((prev) => Math.max(prev - 1, 0));

  return (
    <Paper sx={{ p: 3, mt: 10 }}>
      <Typography variant="h5" gutterBottom>
        Fill Your Details
      </Typography>

      <Box sx={{ display: "flex", mt: 10 }}>
        {/* Tabs on left */}
        <Box sx={{ borderRight: 1, borderColor: "divider", minWidth: 200 }}>
          <Tabs
            orientation="vertical"
            value={tabIndex}
            onChange={handleTabChange}
          >
            <Tab label="Personal Info" />
            <Tab label="Work Experience" />
            <Tab label="Education" />
            <Tab label="Key Skills" />
          </Tabs>
        </Box>

        {/* Content on right */}
        <Box sx={{ flexGrow: 1, pl: 3 }}>
          <TabPanel value={tabIndex} index={0}>
            <PersonalInfoForm defaultValues={resume.personalInfo} onNext={goNext} />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <WorkExperienceForm
              defaultValues={resume.workExperience}
              onNext={goNext}
              onBack={goBack}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <EducationForm
              defaultValues={resume.education}
              onNext={goNext}
              onBack={goBack}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={3}>
            <KeySkillsForm
              defaultValues={resume.skills}
              onBack={goBack}
            />
          </TabPanel>
        </Box>
      </Box>
    </Paper>
  );
}
