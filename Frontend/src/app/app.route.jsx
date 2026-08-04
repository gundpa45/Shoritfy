import { createBrowserRouter } from "react-router";
import LandingPage from "../features/landing/LandingPage";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "../features/auth/AuthPages";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import DashboardPage from "../features/dashboard/DashboardPage";
import UploadPage from "../features/upload/UploadPage";
import ProcessingPage from "../features/processing/ProcessingPage";
import ResultsPage from "../features/results/ResultsPage";
import ProfilePage from "../features/profile/ProfilePage";
import ProjectsPage from "../features/projects/ProjectsPage";
import AnalyticsPage from "../features/analytics/AnalyticsPage";
import UrlPage from "../features/main/pages/Url";
import { Navigate } from "react-router";

export const appRoutes = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/url",
    element: <UrlPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },

  // App routes (dashboard layout)
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/upload",
        element: <UploadPage />,
      },
      {
        path: "/processing/:jobId",
        element: <ProcessingPage />,
      },
      {
        path: "/results/:jobId",
        element: <ResultsPage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/billing",
        element: <Navigate to="/profile" replace />,
      },
      {
        path: "/settings",
        element: <Navigate to="/profile" replace />,
      },
    ],
  },

  // 404 fallback
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);