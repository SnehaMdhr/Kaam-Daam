import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const DashboardWithoutLogin = lazy(() => import("./public/dashboardWithoutLogin"));
const Login = lazy(() => import("./public/login"));
const Register = lazy(() => import("./public/register"));
const ResetPassword = lazy(() => import("./public/forget"));
const Searchjob = lazy(() => import("./public/searchjob"));
const Service = lazy(() => import("./public/service"));
const Contract = lazy(() => import("./public/contract")); 
const Help = lazy(() => import("./public/help"));
const About = lazy(() => import("./public/about"));
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<DashboardWithoutLogin />} />
          <Route path="/dashboardWithout" element={<DashboardWithoutLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget" element={<ResetPassword />} />
          <Route path="/searchjob" element={<Searchjob />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          {/* Add more routes as needed */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
