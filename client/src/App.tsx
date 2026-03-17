import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import LoadingScreen from "@/components/landing/LoadingScreen";
import CookieBanner from "@/components/landing/CookieBanner";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <LoadingScreen onComplete={() => setLoaded(true)} />
        {loaded && (
          <>
            <Router />
            <CookieBanner />
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
