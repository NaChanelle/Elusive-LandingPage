import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ComingSoon from "@/pages/coming-soon";
import Landing from "@/pages/landing";
import VesselTeaser from "@/pages/vessel-teaser";
import DynamicComingSoon from "@/pages/dynamic-coming-soon";
import ContentAdmin from "@/pages/content-admin";
import SignUp from "@/pages/signup";
import SignIn from "@/pages/signin";
import NotFound from "@/pages/not-found";
import ProtectedRoute from "@/components/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ComingSoon} />
      <Route path="/dynamic" component={DynamicComingSoon} />
      <Route path="/admin" component={ContentAdmin} />
      <Route path="/platform" component={Landing} />
      <Route path="/vessel" component={VesselTeaser} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
