// src/components/TemplateCard.jsx
import { Card, Box, Typography, Button } from "@mui/material";

export default function TemplateCard({ template, onUseTemplate }) {
  const { primaryColor, headerVariant } = template;

  // Reusable mini "avatar"
  const ProfileCircle = ({ inverted = false }) => (
    <Box
      sx={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 9,
        fontWeight: 700,
        bgcolor: inverted ? "#fff" : primaryColor,
        color: inverted ? primaryColor : "#fff",
        flexShrink: 0,
      }}
    >
      CC
    </Box>
  );

  // ---------------- HEADER STYLES ----------------
  const renderMiniHeader = () => {
    switch (headerVariant) {
      case "strip-top":
        return (
          <>
            <Box
              sx={{
                height: "10%",
                bgcolor: primaryColor,
                borderRadius: 0,
              }}
            />
            <Box
              sx={{
                p: 1.4,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <ProfileCircle />
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                  Chris Candidate
                </Typography>
                <Typography sx={{ fontSize: 9, color: "text.secondary" }}>
                  Human Resource Manager
                </Typography>
              </Box>
            </Box>
          </>
        );

      case "title-left-line":
        return (
          <Box sx={{ p: 1.4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ProfileCircle />
              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: primaryColor,
                  }}
                >
                  Chris Candidate
                </Typography>
                <Typography
                  sx={{ fontSize: 9, color: "text.secondary", mb: 0.5 }}
                >
                  Human Resource Manager
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 0.6,
                height: 2,
                width: "65%",
                bgcolor: primaryColor,
                borderRadius: 0,
              }}
            />
          </Box>
        );

      case "solid-block":
        return (
          <Box
            sx={{
              height: "25%",
              bgcolor: primaryColor,
              color: "#fff",
              px: 1.4,
              py: 1.2,
              borderRadius: 0,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ProfileCircle inverted />
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                CHRIS CANDIDATE
              </Typography>
              <Typography sx={{ fontSize: 9, mt: 0.5 }}>
                HUMAN RESOURCE MANAGER
              </Typography>
            </Box>
          </Box>
        );

      case "thin-rule":
      default:
        return (
          <>
            <Box
              sx={{
                height: 4,
                bgcolor: primaryColor,
                borderRadius: 0,
              }}
            />
            <Box
              sx={{
                p: 1.4,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <ProfileCircle />
              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                  }}
                >
                  CHRIS CANDIDATE
                </Typography>
                <Typography sx={{ fontSize: 9, color: "text.secondary" }}>
                  Human Resource Manager
                </Typography>
              </Box>
            </Box>
          </>
        );
    }
  };

  // ---------------- BODY SECTION ----------------
  const renderMiniBody = () => (
    <Box
      sx={{
        flex: 1,
        px: 1.4,
        pb: 1.4,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {["Professional Experience", "Education", "Key Skills"].map((section) => (
        <Box key={section}>
          <Typography
            sx={{
              fontSize: 9,
              fontWeight: 600,
              color: primaryColor,
              mb: 0.3,
            }}
          >
            {section}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Box
              sx={{
                height: 4,
                bgcolor: "grey.300",
                borderRadius: 0,
              }}
            />
            <Box
              sx={{
                height: 4,
                width: "80%",
                bgcolor: "grey.200",
                borderRadius: 0,
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 0,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        width: 280,
        height: 380,
        "&:hover .overlay": { opacity: 1 },
      }}
    >
      {/* Mini resume A4 page */}
      <Box
        sx={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
          borderRadius: 0,
        }}
      >
        {renderMiniHeader()}
        {renderMiniBody()}
      </Box>

      {/* Hover overlay */}
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.5)",
          opacity: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 0.3s",
        }}
      >
        <Button
          variant="contained"
          sx={{ textTransform: "none", px: 4,}}
          onClick={onUseTemplate}
        >
          Use Template
        </Button>
      </Box>
    </Card>
  );
}