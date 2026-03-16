
import { Route, Routes } from "react-router-dom";
import {IndexPage, DocsPage, PricingPage, BlogPage, AboutPage, PageCourse, ForgotPasswordPage, SettingsPage} from "@/pages";

import AdminPanel from "@/pages/AdminPanel";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageTable from "@/pages/PageTable";
import DefaultLayout from "./layouts/default";

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
      <Route path="/pagetable/:idCurso" element={<PageTable />} />
      <Route path="/admin" element={
  <ProtectedRoute>
    <DefaultLayout>
       <AdminPanel />
    </DefaultLayout>
   
  </ProtectedRoute>
} />

    </Routes>
  );
}

export default App;
