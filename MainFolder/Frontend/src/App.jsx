import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const DashboardWithoutLogin = lazy(() => import("./public/dashboardWithoutLogin"));
const Login = lazy(() => import("./public/login"));
const Register = lazy(() => import("./public/register"));
const ResetPassword = lazy(() => import("./public/forget"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<DashboardWithoutLogin />} />
          <Route path="/dashboardWithout" element={<DashboardWithoutLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget" element={<ResetPassword />} />x
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
