import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Login } from "@/pages/Login";
import { ConstituencySelector } from "@/pages/l1/ConstituencySelector";
import { ACDetailedDashboard } from "@/pages/l1/ACDetailedDashboard";
import { L0Dashboard } from "@/pages/l0/Dashboard";
import { L2Dashboard } from "@/pages/l2/Dashboard";
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
      <Route path="/l0/dashboard" element={
        <ProtectedRoute allowedRoles={['L0']}>
          <L0Dashboard />
        </ProtectedRoute>
      } />
      
      {/* L1 Routes */}
      <Route path="/l1/constituencies" element={
        <ProtectedRoute allowedRoles={['L1']}>
          <ConstituencySelector />
        </ProtectedRoute>
      } />
      <Route path="/l1/ac/:acNumber" element={
        <ProtectedRoute allowedRoles={['L1']}>
          <ACDetailedDashboard />
        </ProtectedRoute>
      } />
      
      {/* L2 Routes */}
      <Route path="/l2/dashboard" element={
        <ProtectedRoute allowedRoles={['L2']}>
          <L2Dashboard />
        </ProtectedRoute>
      } />
      
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
