import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./public/login"));
const Register = lazy(() => import("./public/register"));
const ResetPassword = lazy(() => import("./public/forget"));
const RoleSelection = lazy(() => import("./public/RoleSelection")); 
const GoogleRedirect = lazy(() => import("./public/GoogleRedirect"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget" element={<ResetPassword />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/google-redirect" element={<GoogleRedirect />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
