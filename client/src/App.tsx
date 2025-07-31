// src/App.tsx
import React, { useEffect } from 'react';
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
  // Global useEffect for MailerLite script and style injection
  useEffect(() => {
    // Declare variables in a scope accessible by the cleanup function
    let styleLink: HTMLLinkElement | null = null;
    let script: HTMLScriptElement | null = null;
    let trackingScript: HTMLScriptElement | null = null;

    // 1. Inject MailerLite fonts.css link into the <head>
    const mailerliteFontsLinkHref = 'https://assets.mlcdn.com/fonts.css?version=1752130';
    if (!document.querySelector(`link[href="${mailerliteFontsLinkHref}"]`)) {
      styleLink = document.createElement('link');
      styleLink.href = mailerliteFontsLinkHref;
      styleLink.rel = 'stylesheet';
      styleLink.type = 'text/css';
      document.head.appendChild(styleLink);
    }

    // 2. Inject MailerLite webforms.min.js script into the <body>
    const mailerliteScriptSrc = 'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024';
    if (!document.querySelector(`script[src="${mailerliteScriptSrc}"]`)) {
      script = document.createElement('script');
      script.src = mailerliteScriptSrc;
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }

    // 3. Define global success callbacks for MailerLite forms
    // This is crucial for MailerLite to show success messages after submission.
    // Ensure these IDs match the data-v2-id in your MailerLite embed HTML.

    // For Landing Page form (ID 28257750)
    (window as any).ml_webform_success_28257750 = function() {
      const $ = (window as any).ml_jQuery || (window as any).jQuery;
      if ($) {
        $('.ml-subscribe-form-28257750 .row-success').show();
        $('.ml-subscribe-form-28257750 .row-form').hide();
      }
      console.log('MailerLite Landing form submitted successfully!');
    };

    // For Coming Soon and Vessel Page forms (ID 28314007)
    (window as any).ml_webform_success_28314007 = function() {
      const $ = (window as any).ml_jQuery || (window as any).jQuery;
      if ($) {
        $('.ml-subscribe-form-28314007 .row-success').show();
        $('.ml-subscribe-form-28314007 .row-form').hide();
      }
      console.log('MailerLite Coming Soon/Vessel form submitted successfully!');
    };

    // Optional: Add the MailerLite tracking snippet if provided by MailerLite.
    // This is usually a small fetch call. Place it here if it needs to be global.
    // If you have a specific tracking snippet from MailerLite, replace the content below.
    const mailerliteTrackingScriptId = 'mailerlite-tracking-script'; // Define ID here
    if (!document.getElementById(mailerliteTrackingScriptId)) {
      trackingScript = document.createElement('script'); // Assign to trackingScript
      trackingScript.id = mailerliteTrackingScriptId;
      trackingScript.innerHTML = `
        // Example: fetch("https://assets.mailerlite.com/jsonp/YOUR_ACCOUNT_ID/forms/YOUR_FORM_ID/takel");
        // Replace with your actual MailerLite tracking snippet if any.
      `;
      document.head.appendChild(trackingScript);
    }

    // Cleanup function: remove scripts and global callbacks when App component unmounts
    return () => {
      // Remove MailerLite fonts link if it was added by this effect
      if (styleLink && styleLink.parentNode) {
        styleLink.parentNode.removeChild(styleLink);
      }

      // Remove MailerLite webforms script if it was added by this effect
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }

      // Remove tracking script if it was added by this effect
      if (trackingScript && trackingScript.parentNode) {
        trackingScript.parentNode.removeChild(trackingScript);
      }
      
      // Clean up global callbacks
      delete (window as any).ml_webform_success_28257750;
      delete (window as any).ml_webform_success_28314007;
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
