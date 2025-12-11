// src/pages/ResumesPage.jsx
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  TextField,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import MiniThumbnail from "../components/MiniThumbnail";
import ResumePreview from "../components/ResumePreview";
import {
  removeSavedResume,
  addSavedResume,
  updateSavedResume,
} from "../redux/slices/savedResumesSlice";

/**
 * ResumesPage
 * - Shows saved resumes with TinyThumbnail
 * - Inline rename
 * - Preview / download / delete
 * - Save current working resume into saved list (auto-save)
 */
export default function ResumesPage() {
  const dispatch = useDispatch();

  // saved resumes and templates
  const saved = useSelector((s) => s.savedResumes.list || []);
  const templates = useSelector((s) => s.templates.templates || []);
  const selectedTemplateId = useSelector((s) => s.templates.selectedTemplateId);

  // current resume state (to allow saving current)
  const resumeState = useSelector((s) => s.resume || {});

  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeResume, setActiveResume] = useState(null);
  const [loading, setLoading] = useState(false);

  // inline rename
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // ref to preview dialog content so we can capture visible DOM if fallback is needed
  const previewContentRef = useRef(null);

  // preview/open handlers
  const openPreview = (resume) => {
    setActiveResume(resume);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setActiveResume(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this saved resume?")) return;
    dispatch(removeSavedResume(id));
  };

  /**
   * downloadResumePDF
   * - Tries to render a ResumePreview into a hidden off-screen container (with ThemeProvider)
   * - Calls html2canvas on the container node
   * - If that fails, falls back to capturing the visible preview dialog content
   */
  const downloadResumePDF = async (resume) => {
    setLoading(true);

    // small helper to create theme wrapper
    const muiTheme = createTheme(); // default theme; if you use a custom theme you can import it instead

    // inner attempt: off-screen React render -> html2canvas
    const tryOffscreenRender = async () => {
      let container = document.getElementById("saved-resume-pdf-container");
      let created = false;
      if (!container) {
        container = document.createElement("div");
        container.id = "saved-resume-pdf-container";
        // Ensure it's visible to the browser layout engine but off-screen
        container.style.position = "fixed";
        container.style.left = "-5000px";
        container.style.top = "0px";
        container.style.width = "800px";
        container.style.zIndex = "9999";
        document.body.appendChild(container);
        created = true;
      } else {
        container.innerHTML = "";
      }

      // Use react-dom/client to mount a small React tree with ThemeProvider so MUI components don't crash
      const ReactDOM = await import("react-dom/client");
      const root = ReactDOM.createRoot(container);

      // pick template for saved resume
      const template = templates.find((t) => t.id === resume.templateId) || templates[0] || {};

      try {
        // render the preview wrapped in ThemeProvider + CssBaseline
        root.render(
          <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <div style={{ width: "800px", background: "#fff" }}>
              <ResumePreview data={resume.data} template={template} />
            </div>
          </ThemeProvider>
        );

        // allow browser to paint
        await new Promise((res) => setTimeout(res, 400));

        // html2canvas the container (not the entire document)
        const canvas = await html2canvas(container, {
          scale: 2,
          useCORS: true,
          // logging: true  // uncomment if you want more html2canvas logs
        });

        // convert to image and PDF using jsPDF
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight <= pageHeight) {
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        } else {
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

        const fileName = (resume.name && resume.name.trim()) || `resume_${resume.id}`;
        pdf.save(`${fileName}.pdf`);

        // cleanup react root + container
        try {
          root.unmount();
        } catch (e) {
          // ignore
        }
        if (created && container.parentNode) container.parentNode.removeChild(container);

        return true;
      } catch (err) {
        // ensure cleanup on error
        console.error("Offscreen render/pdf generation failed:", err);
        try {
          root.unmount();
        } catch (e) {
          // ignore
        }
        if (created && container.parentNode) container.parentNode.removeChild(container);
        throw err;
      }
    }; // end tryOffscreenRender

    // fallback: capture visible preview dialog content
    const tryVisibleCapture = async () => {
      if (!previewContentRef.current) {
        throw new Error("Preview DOM node not mounted for fallback capture.");
      }
      const node = previewContentRef.current;
      // wait a tick to ensure any layout settles
      await new Promise((res) => setTimeout(res, 200));
      const canvas = await html2canvas(node, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
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

      const fileName = (resume.name && resume.name.trim()) || `resume_${resume.id}`;
      pdf.save(`${fileName}.pdf`);
      return true;
    };

    // Attempt off-screen first; if it fails, open preview dialog and capture visible content
    try {
      await tryOffscreenRender();
    } catch (err) {
      console.warn("Offscreen rendering failed, attempting visible-capture fallback. Error:", err);
      // open preview dialog if not open
      setActiveResume(resume);
      setPreviewOpen(true);

      // Wait for dialog to mount (a short delay)
      await new Promise((res) => setTimeout(res, 350));

      try {
        await tryVisibleCapture();
      } catch (err2) {
        console.error("Fallback visible-capture also failed:", err2);
        alert("Failed to generate PDF. See console for details.");
      } finally {
        // leave preview open so user can inspect — don't auto-close
      }
    } finally {
      setLoading(false);
    }
  };

  // Inline rename save
  const saveRename = (id) => {
    const trimmed = (editValue || "").trim();
    if (!trimmed) return;
    dispatch(updateSavedResume({ id, updates: { name: trimmed } }));
    setEditingId(null);
    setEditValue("");
  };

  // Save current working resume into saved list
  const saveCurrentResume = () => {
    const templateId = selectedTemplateId || (templates && templates[0] && templates[0].id) || null;
    if (!templateId) {
      alert("Please select a template before saving the resume.");
      return;
    }

    const hasContent =
      (resumeState.personalInfo && Object.keys(resumeState.personalInfo).length > 0) ||
      (resumeState.workExperience && resumeState.workExperience.length > 0) ||
      (resumeState.education && resumeState.education.length > 0) ||
      (resumeState.skills && resumeState.skills.length > 0);

    if (!hasContent) {
      if (!window.confirm("Resume looks empty. Save anyway?")) return;
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

    dispatch(addSavedResume(payload));
  };

  return (
    <Paper sx={{ p: 10, mt: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <div>
          <Typography variant="h5">My Resumes</Typography>
          <Typography variant="body2" color="text.secondary">
            All resumes you saved from the Resume Maker are listed here. Preview, download or delete.
          </Typography>
        </div>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={RouterLink} to="/" variant="contained">
            Create New
          </Button>
        </Box>
      </Box>

      {saved.length === 0 ? (
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            No saved resumes yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={5}>
          {saved.map((r) => {
            const template = templates.find((t) => t.id === r.templateId) || {};
            return (
              <Grid item xs={12} sm={6} md={4} key={r.id}>
                <Box sx={{ display: "flex", alignItems: "start", gap: 1 }}>
                  {editingId === r.id ? (
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <TextField
                        size="small"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveRename(r.id);
                        }}
                      />
                      <IconButton size="small" onClick={() => saveRename(r.id)} aria-label="save name">
                        <CheckIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: 180,
                        }}
                      >
                        {r.name || "Untitled Resume"}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditingId(r.id);
                          setEditValue(r.name || "");
                        }}
                        aria-label="edit name"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}

                  <Box>
                    <Tooltip title="Preview">
                      <IconButton onClick={() => openPreview(r)} size="small">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Download PDF">
                      <IconButton onClick={() => downloadResumePDF(r)} size="small" disabled={loading}>
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(r.id)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {/* Thumbnail uses MiniThumbnail which should accept (saved, template) */}
                <Box sx={{ mt: 2 }}>
                  <MiniThumbnail saved={r} template={template} />
                </Box>

                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                  <Button size="small" onClick={() => openPreview(r)}>
                    Open
                  </Button>
                  <Button size="small" variant="outlined" onClick={() => downloadResumePDF(r)} disabled={loading}>
                    Download
                  </Button>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Preview dialog */}
      <Dialog open={previewOpen} onClose={closePreview} maxWidth="md" fullWidth>
        <DialogTitle>{activeResume?.name || "Preview Resume"}</DialogTitle>
        <DialogContent dividers ref={previewContentRef}>
          {activeResume && (
            <ResumePreview
              data={activeResume.data}
              template={templates.find((t) => t.id === activeResume.templateId) || templates[0]}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => activeResume && downloadResumePDF(activeResume)} startIcon={<DownloadIcon />}>
            Download PDF
          </Button>
          <Button onClick={closePreview}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
