import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar sx={{ mb: 3 }}>
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          <Typography sx={{ flexGrow: 1 }}>
        <Box
    component={RouterLink}
    to="/"
    sx={{
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
    }}
  >
    <Box
      component="img"
      src="/logo.png"
      alt="Resume Builder Logo"
      sx={{
        height: 36,
        mr: 1,
      }}
    />
  </Box>
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Resume Templates
          </Button>
          <Button color="inherit" component={RouterLink} to="/resumes">
            My Resumes
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            About Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
