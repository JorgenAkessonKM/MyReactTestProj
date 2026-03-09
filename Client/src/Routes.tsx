// src/Routes.tsx
import { Route, Routes } from "react-router-dom";
import { LoginCallback } from "@okta/okta-react";
import Home from "./pages/Home";
import About from "./pages/About";
import Cards from "./pages/Cards";
import Config from "./pages/Config";
import NotFound from "./pages/NotFound";
import AuthProvider from "./contexts/AuthProvider";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/config" element={<Config />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
