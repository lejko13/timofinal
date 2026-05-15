import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
// import PageNotFound from "./lib/PageNotFound";
// import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import { ThemeProvider } from "./lib/ThemeContext";
import { LangProvider } from "./lib/LangContext";

import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import ServiceCustomHouse from "./pages/ServiceCustomHouse";
import InteriorDesign from "./pages/services/InteriorDesign";
import AboutUs from "./pages/AboutUs";
import CommercialDesign from "./pages/services/CommercialDesign";
import ExteriorDesign from "./pages/services/ExteriorDesign";

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

const AuthenticatedApp = () => {
  // const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // if (isLoadingPublicSettings || isLoadingAuth) {
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center bg-background">
  //       <div className="w-6 h-6 border-2 border-border border-t-foreground rounded-full animate-spin" />
  //     </div>
  //   );
  // }

  // if (authError) {
  //   if (authError.type === "user_not_registered") return <UserNotRegisteredError />;
  //   if (authError.type === "auth_required") { navigateToLogin(); return null; }
  // }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projekty" element={<Projects />} />
        <Route path="/projekty/:slug" element={<ProjectDetail />} />
        {/* <Route path="/sluzby/rodinny-dom" element={<ServiceCustomHouse />} /> */}
        <Route path="/services/interior-design" element={<InteriorDesign />} />
        <Route path="/services/commercial-design" element={<CommercialDesign />} />
        <Route path="/services/exterior-design" element={<ExteriorDesign />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/onas" element={<AboutUs />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        {/* <AuthProvider> */}
          <QueryClientProvider client={queryClientInstance}>
            <Router>
              <AuthenticatedApp />
            </Router>
            <Toaster />
          </QueryClientProvider>
        {/* </AuthProvider> */}
      </LangProvider>
    </ThemeProvider>
  );
}