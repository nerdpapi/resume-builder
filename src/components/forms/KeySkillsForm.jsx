// src/components/forms/KeySkillsForm.jsx
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Stack,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setSkills } from "../../redux/slices/resumeSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function KeySkillsForm({ defaultValues = [], onBack }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkillsState] = useState(defaultValues);

  const { handleSubmit } = useForm();

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    if (skills.includes(trimmed)) return;
    setSkillsState((prev) => [...prev, trimmed]);
    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setSkillsState((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const onSubmit = () => {
    dispatch(setSkills(skills));
    navigate("/preview");
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        backgroundColor: "#fff",
        p: { xs: 3, sm: 4 },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h6" sx={{ mb: 4, borderBottom: "1px solid#484849",
            pb: 3,
            gap: 2, }}>
          Key Skills
        </Typography>
        
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Add your core skills and technologies. These will appear in the Skills
          section of your resume.
        </Typography>

        <Stack spacing={2}>
          {/* Input + Add button */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Add a skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button
              variant="outlined"
              type="button"
              onClick={addSkill}
            >
              Add
            </Button>
          </Box>

          {/* Chips list */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => removeSkill(skill)}
                variant="outlined"
              />
            ))}

            {skills.length === 0 && (
              <Box sx={{ color: "text.secondary", fontSize: 14 }}>
                No skills added yet. Start by typing a skill and click &quot;Add&quot;.
              </Box>
            )}
          </Box>

          {/* Footer buttons */}
          <Box
            sx={{
              borderTop: "1px solid #f1f5f9",
              mt: 2,
              pt: 2,
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button variant="outlined" type="button" onClick={onBack}>
              Back
            </Button>
            <Button variant="contained" type="submit">
              Preview Resume
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
