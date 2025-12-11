import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TemplateCard from "../components/TemplateCard";
import { selectTemplate } from "../redux/slices/templatesSlice";

export default function HomePage() {
  const templates = useSelector((state) => state.templates.templates);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUseTemplate = (id) => {
    dispatch(selectTemplate(id));
    navigate("/details");
  };

  return (
    <Box sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Build Your Professional Resume
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, mt: 2 }}>
        Choose a template, fill in your details, preview your resume, and download it as a PDF.
      </Typography>

      <Grid container spacing={3}>
        {templates.map((tpl) => (
          <Grid item xs={12} sm={6} md={4} key={tpl.id}>
            <TemplateCard
              template={tpl}
              onUseTemplate={() => handleUseTemplate(tpl.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
