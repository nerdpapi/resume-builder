import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import PreviewPage from "./pages/PreviewPage";
import ResumesPage from "./pages/ResumesPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ pb: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/resumes" element={<ResumesPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
