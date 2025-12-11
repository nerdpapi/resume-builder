// src/components/forms/WorkExperienceForm.jsx
import { useFieldArray, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  MenuItem,
  Divider,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setWorkExperience } from "../../redux/slices/resumeSlice";

export default function WorkExperienceForm({
  defaultValues = [],
  onNext,
  onBack,
}) {
  const dispatch = useDispatch();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 41 }, (_, i) => currentYear - i);

  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      experiences: defaultValues.length
        ? defaultValues
        : [
            {
              role: "",
              company: "",
              startYear: "",
              endYear: "",
              description: "",
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const onSubmit = (data) => {
    dispatch(setWorkExperience(data.experiences));
    onNext();
  };

  const handleAddNew = () => {
    append({
      role: "",
      company: "",
      startYear: "",
      endYear: "",
      description: "",
    });
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
        {/* Title */}
        <Typography variant="h6" sx={{ mb: 1 }}>
          Work Experience
        </Typography>

        <Divider sx={{ mb: 3, padding: 1, borderColor: "#484849"}} /> 

        {fields.map((field, index) => (
          <Box key={field.id} sx={{ mb: 3, position: "relative" }}>
            {/* Top Row: label + delete */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Experience {index + 1}
              </Typography>

              {fields.length > 1 && (
                <IconButton
                  size="small"
                  onClick={() => remove(index)}
                  aria-label="delete experience"
                  sx={{ color: "error.main" }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              )}
            </Box>


            {/* Job Title / Organization */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 2 }}
            >
              <TextField
                label="Job Title"
                fullWidth
                {...register(`experiences.${index}.role`, {
                  required: "Job title is required",
                })}
              />
              <TextField
                label="Organization Name"
                fullWidth
                {...register(`experiences.${index}.company`, {
                  required: "Organization name is required",
                })}
              />
            </Stack>

            {/* Start Year / End Year */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 2 }}
            >
              <TextField
                select
                label="Start year"
                fullWidth
                {...register(`experiences.${index}.startYear`)}
              >
                <MenuItem value="">Select year</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="End year"
                fullWidth
                {...register(`experiences.${index}.endYear`)}
              >
                <MenuItem value="">Select year</MenuItem>
                <MenuItem value="Present">Present</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            {/* Description */}
            <TextField
              label="Description"
              multiline
              minRows={3}
              fullWidth
              placeholder="Describe your role, key responsibilities and achievements"
              {...register(`experiences.${index}.description`)}
            />
          </Box>
        ))}

        {/* Add new */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button
            type="button"
            onClick={handleAddNew}
            sx={{
              textTransform: "none",
              p: 0,
              minWidth: "auto",
              fontSize: 14,
              color: "primary.main",
            }}
          >
            Add new
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Footer buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
}
