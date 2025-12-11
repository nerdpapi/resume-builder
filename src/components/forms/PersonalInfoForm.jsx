// src/components/forms/PersonalInfoForm.jsx
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Stack,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setPersonalInfo } from "../../redux/slices/resumeSlice";
import { useState } from "react";

export default function PersonalInfoForm({ defaultValues, onNext }) {
  const dispatch = useDispatch();
  const [photoPreview, setPhotoPreview] = useState(defaultValues.photo || null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      photo: defaultValues.photo || null,
      firstName: defaultValues.firstName || "",
      lastName: defaultValues.lastName || "",
      email: defaultValues.email || "",
      mobile: defaultValues.mobile || "",
      address: defaultValues.address || "",
      city: defaultValues.city || "",
      state: defaultValues.state || "",
      postalCode: defaultValues.postalCode || "",
      objective: defaultValues.objective || "",
    },
  });

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
      setValue("photo", reader.result); // store base64 in form state
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

    const payload = {
      ...data,
      fullName, // used by ResumePreview
    };

    dispatch(setPersonalInfo(payload));
    onNext();
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
        <Stack spacing={3}>
          {/* Profile picture + change text */}
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              src={photoPreview || ""}
              sx={{
                width: 96,
                height: 96,
                mx: "auto",
                mb: 1,
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            />
            <Typography
              component="label"
              htmlFor="profile-photo-input"
              sx={{
                fontSize: 14,
                color: "primary.main",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Change Profile photo
            </Typography>
            <input
              id="profile-photo-input"
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </Box>

          {/* hidden photo field for react-hook-form */}
          <input type="hidden" {...register("photo")} />

          {/* First / Last name */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              label="First name"
              fullWidth
              {...register("firstName", { required: "First name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              label="Last name"
              fullWidth
              {...register("lastName", { required: "Last name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Stack>

          {/* Email / Mobile */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              label="Email"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Mobile"
              fullWidth
              {...register("mobile", { required: "Mobile number is required" })}
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
            />
          </Stack>

          {/* Address */}
          <TextField
            label="Address"
            fullWidth
            {...register("address")}
          />

          {/* City / State */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              label="City"
              fullWidth
              {...register("city")}
            />
            <TextField
              label="State"
              fullWidth
              {...register("state")}
            />
          </Stack>

          {/* Postal code */}
          <TextField
            label="Postal code"
            fullWidth
            {...register("postalCode")}
          />

          {/* Objective */}
          <TextField
            label="Objective"
            multiline
            minRows={4}
            {...register("objective")}
          />

          {/* Buttons row (only Next here; Back is handled by parent on other tabs) */}
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
            {/* If you ever want Back here: add a Back button and pass onBack prop */}
            <Button
              variant="contained"
              type="submit"
            >
              Next
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
