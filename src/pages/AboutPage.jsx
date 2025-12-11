// src/pages/AboutPage.jsx
import { Paper, Typography, Box, Stack, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const ILLUSTRATION_URL =
  "https://cdn.prod.website-files.com/5bff8886c3964a992e90d465/5c00621b7aefa4f9ee0f4303_wide-shot.svg";

export default function AboutPage() {
  const appUrl = window.location.origin;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `Check out this Resume Builder: ${appUrl}`
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      appUrl
    )}`,
    email: `mailto:?subject=${encodeURIComponent(
      "Resume Builder"
    )}&body=${encodeURIComponent(
      `Check out this Resume Builder: ${appUrl}`
    )}`,
  };

  return (
    <Paper
      sx={{
        p: { xs: 3, md: 6 },
        mt: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: { xs: 3, md: 6 },
        }}
      >
        {/* Left: Text content */}
        <Box sx={{ flex: 1, maxWidth: 600 }}>
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 3,
              bgcolor: "primary.main",
              borderRadius: 999,
              mb: 3,
            }}
          />

          <Typography variant="body1" paragraph>
            This Resume Builder web application is part of a Capstone Project in the
            Full Stack Web Development program. It integrates React, Material UI,
            Redux, React Hook Form, routing, and PDF generation.
          </Typography>

          <Typography variant="body1" paragraph>
            The goal is to help learners build production-style applications while
            allowing users to quickly generate professional resumes.
          </Typography>

          {/* Share Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Share with your friends
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Spread the word and help others build great resumes!
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              {/* WhatsApp */}
              <IconButton
                component="a"
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: "#25D366",
                  color: "#fff",
                  "&:hover": { bgcolor: "#1c9e52" },
                }}
              >
                <WhatsAppIcon />
              </IconButton>

              {/* LinkedIn */}
              <IconButton
                component="a"
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: "#0077b5",
                  color: "#fff",
                  "&:hover": { bgcolor: "#005f8d" },
                }}
              >
                <LinkedInIcon />
              </IconButton>

              {/* Email */}
              <IconButton
                component="a"
                href={shareLinks.email}
                sx={{
                  bgcolor: "#e0e0e0",
                  color: "#555",
                  "&:hover": { bgcolor: "#cfcfcf" },
                }}
              >
                <EmailIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        {/* Right: Image */}
        <Box
          sx={{
            flexShrink: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={ILLUSTRATION_URL}
            alt="Illustration"
            sx={{
              width: { xs: 220, sm: 260, md: 320 },
              maxWidth: "100%",
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}
