import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Login } from "@/pages/Login";
import { ConstituencySelector } from "@/pages/l1/ConstituencySelector";
import { ACDetailedDashboard } from "@/pages/l1/ACDetailedDashboard";
import { GlobalAnalytics } from "@/pages/l1/GlobalAnalytics";
import { ModeratorManagement } from "@/pages/l1/ModeratorManagement";
import { AgentManagement as L1AgentManagement } from "@/pages/l1/AgentManagement";
import { LiveSurveyMonitor } from "@/pages/l1/LiveSurveyMonitor";
import { L0Dashboard } from "@/pages/l0/Dashboard";
import { AdminManagement } from "@/pages/l0/AdminManagement";
import { AppSettings } from "@/pages/l0/AppSettings";
import { VoterData } from "@/pages/l0/VoterData";
import { SurveyBank } from "@/pages/l0/SurveyBank";
import { L2Dashboard } from "@/pages/l2/Dashboard";
import { VoterManager } from "@/pages/l2/VoterManager";
import { FamilyManager } from "@/pages/l2/FamilyManager";
import { SurveyManager } from "@/pages/l2/SurveyManager";
import { AgentManagement as L2AgentManagement } from "@/pages/l2/AgentManagement";
import { LiveBoothUpdates } from "@/pages/l2/LiveBoothUpdates";
import { Reports } from "@/pages/l2/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const RoleBasedRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  switch (user?.role) {
    case 'L0':
      return <Navigate to="/l0/dashboard" replace />;
    case 'L1':
      return <Navigate to="/l1/constituencies" replace />;
    case 'L2':
      return <Navigate to="/l2/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RoleBasedRedirect />} />
      
      {/* L0 Routes */}
      <Route path="/l0/dashboard" element={<ProtectedRoute allowedRoles={['L0']}><L0Dashboard /></ProtectedRoute>} />
      <Route path="/l0/admins" element={<ProtectedRoute allowedRoles={['L0']}><AdminManagement /></ProtectedRoute>} />
      <Route path="/l0/settings" element={<ProtectedRoute allowedRoles={['L0']}><AppSettings /></ProtectedRoute>} />
      <Route path="/l0/voters" element={<ProtectedRoute allowedRoles={['L0']}><VoterData /></ProtectedRoute>} />
      <Route path="/l0/surveys" element={<ProtectedRoute allowedRoles={['L0']}><SurveyBank /></ProtectedRoute>} />
      
      {/* L1 Routes */}
      <Route path="/l1/constituencies" element={<ProtectedRoute allowedRoles={['L1']}><ConstituencySelector /></ProtectedRoute>} />
      <Route path="/l1/ac/:acNumber" element={<ProtectedRoute allowedRoles={['L1']}><ACDetailedDashboard /></ProtectedRoute>} />
      <Route path="/l1/analytics" element={<ProtectedRoute allowedRoles={['L1']}><GlobalAnalytics /></ProtectedRoute>} />
      <Route path="/l1/moderators" element={<ProtectedRoute allowedRoles={['L1']}><ModeratorManagement /></ProtectedRoute>} />
      <Route path="/l1/agents" element={<ProtectedRoute allowedRoles={['L1']}><L1AgentManagement /></ProtectedRoute>} />
      <Route path="/l1/live-surveys" element={<ProtectedRoute allowedRoles={['L1']}><LiveSurveyMonitor /></ProtectedRoute>} />
      
      {/* L2 Routes */}
      <Route path="/l2/dashboard" element={<ProtectedRoute allowedRoles={['L2']}><L2Dashboard /></ProtectedRoute>} />
      <Route path="/l2/voters" element={<ProtectedRoute allowedRoles={['L2']}><VoterManager /></ProtectedRoute>} />
      <Route path="/l2/families" element={<ProtectedRoute allowedRoles={['L2']}><FamilyManager /></ProtectedRoute>} />
      <Route path="/l2/surveys" element={<ProtectedRoute allowedRoles={['L2']}><SurveyManager /></ProtectedRoute>} />
      <Route path="/l2/agents" element={<ProtectedRoute allowedRoles={['L2']}><L2AgentManagement /></ProtectedRoute>} />
      <Route path="/l2/live-updates" element={<ProtectedRoute allowedRoles={['L2']}><LiveBoothUpdates /></ProtectedRoute>} />
      <Route path="/l2/reports" element={<ProtectedRoute allowedRoles={['L2']}><Reports /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
