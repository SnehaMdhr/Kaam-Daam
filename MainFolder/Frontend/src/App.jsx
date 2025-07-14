import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const DashboardWithoutLogin = lazy(() =>
  import("./public/dashboardWithoutLogin")
);
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
const EmployerCompanyProfile = lazy(() =>
  import("./public/employercompanyprofile")
);
const Employerjobposting = lazy(() => import("./public/employerjobposting"));
const Empoyerjobapplications = lazy(() =>
  import("./public/employerapplicationmanagement")
);
const CreateJob = lazy(() => import("./public/CreateJob"));
const JobDetails = lazy(() => import("./public/JobDetails"));
const StudentDashboard = lazy(() => import("./public/studentdashboard"));
const StudentJobs = lazy(() => import("./public/studentjobs"));
const StudentMessage = lazy(() => import("./public/studentmessage"));
const StudentMyApplication = lazy(() =>
  import("./public/studentmyapplication")
);
const StudentProfile = lazy(() => import("./public/studentprofile"));
const StudentReview = lazy(() => import("./public/studentreview"));
const StudentSetting = lazy(() => import("./public/studentsetting"));
const StudentViewJob = lazy(() => import("./public/studentviewjob"));
const StudentViewProfile = lazy(() => import("./public/StudentViewProfile"));
const EmployerViewProfile = lazy(() => import("./public/EmployerViewProfile"));
const AddReview = lazy(() => import("./public/AddReview"));
const FindEmployees = lazy(() => import("./public/FindEmployees"));
const StudentEmployerList = lazy(() => import("./public/StudentEmployerList"));
const EmployerStudentList = lazy(() => import("./public/EmployerStudentList"));

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
          <Route path="/resetthing" element={<ResetThing />} />
          <Route path="/createjob" element={<CreateJob />} />

          <Route path="/settingemployer" element={<SettingEmployer />} />
          <Route path="/employeranalytics" element={<EmployerAnalytics />} />
          <Route
            path="/employer/messages/:studentId"
            element={<EmployerMessage />}
          />
          <Route path="/employerdashboard" element={<EmployerDashboard />} />
          <Route
            path="/employercompanyprofile"
            element={<EmployerCompanyProfile />}
          />
          <Route path="/employerjobposting" element={<Employerjobposting />} />
          <Route
            path="/empoyerjobapplicationmanagement"
            element={<Empoyerjobapplications />}
          />
          <Route path="/jobdetails/:id" element={<JobDetails />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/studentjobs" element={<StudentJobs />} />
          <Route
            path="/student/messages/:employerId"
            element={<StudentMessage />}
          />
          <Route
            path="/studentmyapplication"
            element={<StudentMyApplication />}
          />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/studentreview/:studentId" element={<StudentReview />} />
          <Route path="/studentsetting" element={<StudentSetting />} />
          <Route path="/studentviewjob/:id" element={<StudentViewJob />} />
          <Route
            path="/studentviewprofile/:userId"
            element={<StudentViewProfile />}
          />
          <Route path="/studentviewprofile" element={<StudentViewProfile />} />
          <Route
            path="/employerviewprofile"
            element={<EmployerViewProfile />}
          />
          <Route path="/add-review/:studentId/:jobId" element={<AddReview />} />
          <Route path="/findemployees" element={<FindEmployees />} />
          <Route path="/student/messages" element={<StudentEmployerList />} />
          <Route path="/employer/messages" element={<EmployerStudentList />} />
          {/* Add more routes as needed */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
