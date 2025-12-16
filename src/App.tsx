
import { Route, Routes } from "react-router-dom";
import {IndexPage, DocsPage, PricingPage, BlogPage, AboutPage, PageCourse, ForgotPasswordPage, SettingsPage} from "@/pages";


import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<LoginPage />} />

      {/* RUTAS PROTEGIDAS */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <IndexPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/docs"
        element={
          <ProtectedRoute>
            <DocsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/format"
        element={
          <ProtectedRoute>
            <PricingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/blog"
        element={
          <ProtectedRoute>
            <BlogPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seguimiento"
        element={
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>
        }
      />
      <Route element={< PageCourse/>} path="/area-detail/:idArea" />

      <Route element={<ForgotPasswordPage />} path="/ForgotPassword" />
      <Route element={<SettingsPage />} path="/settings" />
    </Routes>
  );
}

export default App;
