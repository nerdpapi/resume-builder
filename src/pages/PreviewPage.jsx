// src/pages/PreviewPage.jsx
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState, useEffect } from "react";
import ResumePreview from "../components/ResumePreview";
import { setResumeName } from "../redux/slices/resumeSlice";
import { addSavedResume } from "../redux/slices/savedResumesSlice";

export default function PreviewPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // grab full resume state to save (not just name/address)
  const resumeState = useSelector((state) => state.resume || {});
  const { resumeName, personalInfo } = resumeState;

  // templates slice: selectedTemplateId and templates list (for fallback)
  const selectedTemplateId = useSelector((state) => state.templates.selectedTemplateId);
  const templates = useSelector((state) => state.templates.templates || []);

  const [openModal, setOpenModal] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Protect route if no template is selected
  useEffect(() => {
    if (!selectedTemplateId && (!templates || templates.length === 0)) {
      // If no template at all, send user back to start
      navigate("/");
    }
  }, [selectedTemplateId, templates, navigate]);

  const handleBack = () => {
    navigate("/details");
  };

  const handleNameChange = (e) => {
    dispatch(setResumeName(e.target.value));
  };

  // Existing function: generate PDF and prompt download
  const handleSaveAsPDF = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    try {
      setDownloading(true);

      const canvas = await html2canvas(element, {
        scale: 2, // for better quality
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight <= pageHeight) {
        // Single page
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        // If content is longer than one page
        let heightLeft = imgHeight;
        let y = 0;

        while (heightLeft > 0) {
          pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          if (heightLeft > 0) {
            pdf.addPage();
            y = -pageHeight;
          }
        }
      }

      const fileName =
        resumeName?.trim() ||
        (personalInfo?.fullName
          ? `${personalInfo.fullName.replace(/\s+/g, "_")}_Resume`
          : "My_Resume");

      pdf.save(`${fileName}.pdf`);
      setOpenModal(true);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. See console.");
    } finally {
      setDownloading(false);
    }
  };

  // NEW: Save current resume into savedResumes slice and navigate to /resumes
  const saveToResumes = () => {
    // choose templateId: selectedTemplateId wins, else fallback to first template id
    const templateId = selectedTemplateId || (templates && templates[0] && templates[0].id) || null;
    if (!templateId) {
      alert("Please select a template before saving the resume.");
      return;
    }

    // ensure there's at least some content (optional)
    const hasContent =
      (resumeState.personalInfo && Object.keys(resumeState.personalInfo).length > 0) ||
      (resumeState.workExperience && resumeState.workExperience.length > 0) ||
      (resumeState.education && resumeState.education.length > 0) ||
      (resumeState.skills && resumeState.skills.length > 0);

    if (!hasContent) {
      if (!window.confirm("Resume appears empty. Save anyway?")) return;
    }

    const newId = Date.now().toString();
    const name =
      (resumeState.resumeName && resumeState.resumeName.trim()) ||
      (resumeState.personalInfo?.fullName
        ? `${resumeState.personalInfo.fullName.replace(/\s+/g, "_")}_Resume`
        : `Resume_${newId}`);

    const payload = {
      id: newId,
      name,
      templateId,
      createdAt: new Date().toISOString(),
      data: {
        personalInfo: resumeState.personalInfo || {},
        workExperience: resumeState.workExperience || [],
        education: resumeState.education || [],
        skills: resumeState.skills || [],
      },
    };

    // dispatch to savedResumes slice
    dispatch(addSavedResume(payload));

    // navigate to Resumes page so user can see it immediately
    navigate("/resumes");
  };

  return (
    <Paper sx={{ maxWidth: 1400, mx: "auto", mt: 10, p: 3 }}>
      <Grid container spacing={3}>
        {/* Left: preview */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Preview
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Review your resume below. If something looks off, go back and edit your details.
          </Typography>

          <ResumePreview />
        </Grid>

        {/* Right: name input + actions */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6">Save Your Resume</Typography>
            <Typography variant="body2" color="text.secondary">
              Give your resume a name. This will be used as the downloaded file name and saved record.
            </Typography>

            <TextField
              label="Resume Name"
              placeholder="e.g. John_Doe_Fullstack_Resume"
              value={resumeName || ""}
              onChange={handleNameChange}
            />

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button variant="outlined" onClick={handleBack} >
                Back
              </Button>

              <Button
                variant="contained"
                onClick={handleSaveAsPDF}
                disabled={downloading}
              >
                {downloading ? "Saving..." : "Save as PDF"}
              </Button>
              <Button variant="contained" color="success" onClick={saveToResumes} >
                Save to My Resumes
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Success Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Download Successful</DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 1 }}>Your resume has been downloaded successfully. 🎉</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
