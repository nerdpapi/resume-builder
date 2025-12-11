// src/components/forms/EducationForm.jsx
import { useForm, useFieldArray } from "react-hook-form";
import {
  TextField,
  Button,
  Stack,
  Box,
  IconButton,
  Typography,
  MenuItem,
  Divider,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setEducation } from "../../redux/slices/resumeSlice";

export default function EducationForm({ defaultValues = [], onNext, onBack }) {
  const dispatch = useDispatch();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 41 }, (_, i) => currentYear - i);

  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      educationItems: defaultValues.length
        ? defaultValues
        : [
            {
              type: "",
              degree: "",
              institution: "",
              startYear: "",
              endYear: "",
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educationItems",
  });

  const onSubmit = (data) => {
    dispatch(setEducation(data.educationItems));
    onNext();
  };

  const handleAddNew = () => {
    append({
      type: "",
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
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
        <Typography variant="h6" sx={{ mb: 1 }}>
          Education Details
        </Typography>
        <Divider sx={{ mb: 3, padding: 1, borderColor: "#484849"}} /> 

        {fields.map((field, index) => (
          <Box key={field.id} sx={{ mb: 3 }}>
            {/* Header row with label + delete */}
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
                Education {index + 1}
              </Typography>

              {fields.length > 1 && (
                <IconButton
                  size="small"
                  onClick={() => remove(index)}
                  aria-label="remove education"
                  sx={{ color: "error.main" }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              )}
            </Box>

            {/* Type */}
            <Box sx={{ mb: 2 }}>
              <TextField
                select
                label="Type"
                fullWidth
                {...register(`educationItems.${index}.type`)}
              >
                <MenuItem value="Post Graduation">Post Graduation</MenuItem>
                <MenuItem value="Graduation">Graduation</MenuItem>
                <MenuItem value="Diploma">Diploma</MenuItem>
                <MenuItem value="Higher Secondary (12th)">
                  Higher Secondary (12th)
                </MenuItem>
                <MenuItem value="Secondary (10th)">Secondary (10th)</MenuItem>
              </TextField>
            </Box>

            {/* University / Degree */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 2 }}
            >
              <TextField
                label="University"
                fullWidth
                {...register(`educationItems.${index}.institution`, {
                  required: "University is required",
                })}
              />
              <TextField
                label="Degree"
                fullWidth
                {...register(`educationItems.${index}.degree`, {
                  required: "Degree is required",
                })}
              />
            </Stack>

            {/* Start year / End year */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
            >
              <TextField
                select
                label="Start year"
                fullWidth
                {...register(`educationItems.${index}.startYear`)}
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
                {...register(`educationItems.${index}.endYear`)}
              >
                <MenuItem value="">Select year</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
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
