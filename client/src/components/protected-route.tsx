import { useEffect } from "react";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // For now, redirect to signup since we don't have full auth yet
    // Later this will check actual authentication status
    const isAuthenticated = false; // This will be replaced with real auth check
    
    if (!isAuthenticated) {
      setLocation("/signup");
    }
  }, [setLocation]);

  // For now, always redirect to signup
  // Later this will render children when authenticated
  return null;
}