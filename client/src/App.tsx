// src/App.tsx
import React, { useEffect } from 'react'; // Added useEffect
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ComingSoon from "@/pages/coming-soon";
import Landing from "@/pages/landing";
import VesselTeaser from "@/pages/vessel-teaser";
import SignUp from "@/pages/signup";
import SignIn from "@/pages/signin";
import NotFound from "@/pages/not-found";
// import ProtectedRoute from "@/components/protected-route"; // Keep if used elsewhere, but not in this Router

function Router() {
  return (
    <Switch>
      <Route path="/" component={ComingSoon} />
      <Route path="/platform" component={Landing} />
      <Route path="/vessel" component={VesselTeaser} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Global useEffect for MailerLite script injection
  // This ensures the MailerLite base script is loaded once for the entire application.
  useEffect(() => {
    const mailerliteScriptId = 'mailerlite-webforms-script';
    // Check if the main MailerLite script is already present to avoid multiple injections
    if (!document.getElementById(mailerliteScriptId)) {
      const script = document.createElement('script');
      script.id = mailerliteScriptId;
      // IMPORTANT: Use the exact MailerLite script URL provided by MailerLite.
      // The version 'v176e10baa5e7ed80d35ae235be3d5024' might change.
      script.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024';
      script.async = true;
      document.head.appendChild(script);

      // Optional: Add the MailerLite tracking snippet if provided by MailerLite.
      // This is usually a small fetch call. Place it here if it needs to be global.
      const mailerliteTrackingScriptId = 'mailerlite-tracking-script';
      if (!document.getElementById(mailerliteTrackingScriptId)) {
        const trackingScript = document.createElement('script');
        trackingScript.id = mailerliteTrackingScriptId;
        trackingScript.innerHTML = `
          // Your MailerLite tracking snippet here, e.g.:
          // fetch("https://assets.mailerlite.com/jsonp/YOUR_ACCOUNT_ID/forms/YOUR_FORM_ID/takel")
          // You might need to get this from your MailerLite account if it's specific.
        `;
        document.head.appendChild(trackingScript);
      }
    }

    // Define the global success callback for MailerLite forms.
    // This function needs to be globally accessible by MailerLite's script.
    // Replace '28257750' with the actual MailerLite form ID if your forms
    // use a specific success callback function name.
    (window as any).ml_webform_success_28257750 = function() { // Adjust ID if needed
      const $ = (window as any).ml_jQuery || (window as any).jQuery;
      if ($) {
        // These selectors are examples. You might need to inspect your MailerLite
        // form's HTML to get the correct class names for its success/form elements.
        $('.ml-subscribe-form-28257750 .row-success').show();
        $('.ml-subscribe-form-28257750 .row-form').hide();
      }
      console.log('MailerLite form submitted successfully!');
    };

    // Cleanup function: remove scripts and global callback when App component unmounts
    return () => {
      const mlScript = document.getElementById(mailerliteScriptId);
      if (mlScript) mlScript.remove();
      const mlTrackingScript = document.getElementById(mailerliteTrackingScriptId);
      if (mlTrackingScript) mlTrackingScript.remove();
      delete (window as any).ml_webform_success_28257750; // Clean up global callback
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

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
