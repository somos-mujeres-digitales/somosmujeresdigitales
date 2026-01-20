import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import LandingPage from "./pages/LandingPage";
import ParaMenteesPage from "./pages/ParaMenteesPage";
import ParaMentorasPage from "./pages/ParaMentorasPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import MenteeOnboardingPage from "./pages/mentee/MenteeOnboardingPage";
import MenteeDashboardPage from "./pages/mentee/MenteeDashboardPage";
import MatchingPage from "./pages/mentee/MatchingPage";
import MentoraProfilePage from "./pages/mentee/MentoraProfilePage";
import BookingPage from "./pages/mentee/BookingPage";
import MentoraDashboardPage from "./pages/mentora/MentoraDashboardPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/para-mentees" element={<ParaMenteesPage />} />
            <Route path="/para-mentoras" element={<ParaMentorasPage />} />
            <Route path="/recursos" element={<LandingPage />} />
            
            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Mentee */}
            <Route path="/mentee/onboarding" element={<MenteeOnboardingPage />} />
            <Route path="/mentee/dashboard" element={<MenteeDashboardPage />} />
            <Route path="/matching" element={<MatchingPage />} />
            <Route path="/mentora/:id" element={<MentoraProfilePage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            
            {/* Mentora */}
            <Route path="/mentora/onboarding" element={<MenteeOnboardingPage />} />
            <Route path="/mentora/dashboard" element={<MentoraDashboardPage />} />
            
            {/* Admin */}
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
