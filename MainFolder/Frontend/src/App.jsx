import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const DashboardWithoutLogin = lazy(() => import("./public/dashboardWithoutLogin"));
const Login = lazy(() => import("./public/login"));
const Register = lazy(() => import("./public/register"));
const ResetPassword = lazy(() => import("./public/forget"));
const RoleSelection = lazy(() => import("./public/RoleSelection")); 
const GoogleRedirect = lazy(() => import("./public/GoogleRedirect"));
const Searchjob = lazy(() => import("./public/searchjob"));
const Service = lazy(() => import("./public/service"));
const Contact = lazy(() => import("./public/contact")); 
const Help = lazy(() => import("./public/help"));
const About = lazy(() => import("./public/about"));
const ResetThing = lazy(() => import("./public/ResetThing"));
const SettingEmployer = lazy(() => import("./public/settingemployer"));
const EmployerAnalytics = lazy(() => import("./public/employeranalytics"));
const EmployerMessage = lazy(() => import("./public/employermessage"));
const EmployerDashboard = lazy(() => import("./public/employerdashboard"));
const EmployerCompanyProfile = lazy(() => import("./public/employercompanyprofile"));
const Employerjobposting = lazy(() => import("./public/employerjobposting"));
const Empoyerjobapplications = lazy(() => import("./public/employerapplicationmanagement"));
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
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/google-redirect" element={<GoogleRedirect />} />
          <Route path="/searchjob" element={<Searchjob />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/resetthing" element={<ResetThing/>} />

          <Route path="/settingemployer" element={<SettingEmployer />} />
          <Route path="/employeranalytics" element={<EmployerAnalytics />} />
          <Route path="/employermessage" element={<EmployerMessage />} />
          <Route path="/employerdashboard" element={<EmployerDashboard />} />
          <Route path="/employercompanyprofile" element={<EmployerCompanyProfile />} />
          <Route path="/employerjobposting" element={<Employerjobposting />} />
          <Route path="/empoyerjobapplicationmanagement" element={<Empoyerjobapplications />} />
          {/* Add more routes as needed */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
