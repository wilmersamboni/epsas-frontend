import { Route, Routes } from "react-router-dom";
import {IndexPage, DocsPage, PricingPage, BlogPage, AboutPage, PageCourse, ForgotPasswordPage, SettingsPage} from "@/pages";

// import IndexPage from "@/pages/index";
// import DocsPage from "@/pages/docs";
// import PricingPage from "@/pages/pricing";
// import BlogPage from "@/pages/blog";
// import AboutPage from "@/pages/about";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/format" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/seguimiento" />
      <Route element={< PageCourse/>} path="/area-detail/:idArea" />
      <Route element={<ForgotPasswordPage />} path="/ForgotPassword" />
      <Route element={<SettingsPage />} path="/settings" />
    </Routes>
  );
}

export default App;
