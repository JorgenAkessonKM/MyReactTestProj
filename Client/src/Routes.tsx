// src/Routes.tsx
import { Route, Routes } from "react-router-dom";
import { LoginCallback } from "@okta/okta-react";
import Home from "./pages/Home";
import About from "./pages/About";
import Cards from "./pages/Cards";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AuthProvider from "./contexts/AuthProvider";
import PrivateRoute from "./PrivateRouting";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cards" element={<Cards />} />
        <Route element={<PrivateRoute />}>
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
