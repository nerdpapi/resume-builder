import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Resume Builder
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
