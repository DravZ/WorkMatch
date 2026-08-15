import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/guest/Dashboard/Dashboard';
import FindWork from './pages/guest/FindWork/FindWork';
import HireWorkers from './pages/guest/HireWorkers/HireWorkers';
import HowItWorks from './pages/guest/HowItWorks/HowItWorks';
import GuestLayout from './layouts/GuestLayout/GuestLayout';
import Login from './pages/guest/Login/Login';
import Register from './pages/guest/Register/Register';
import WorkerDashboard from './pages/worker/Dashboard/WorkerDashboard';
import Applications from './pages/worker/Applications/Applications';
import FindJobs from './pages/worker/FindJobs/FindJobs';
import Messages from './pages/worker/Messages/Messages';
import WorkerProfile from './pages/worker/Profile/WorkerProfile';
import Saved from './pages/worker/Saved/Saved';
import WorkerLayout from './layouts/WorkerLayout/WorkerLayout';
import WorkerNotifications from './pages/worker/Notifications/WorkerNotifications';
import EmployerApplications from './pages/employer/Applications/EmployerApplications';
import FindWorkers_Emp from './pages/employer/FindWorkers/FindWorkers_Emp';
import EmployerMessages from './pages/employer/Messages/EmployerMessages';
import EmployerNotifications from './pages/employer/Notifications/EmployerNotifications';
import EmployerDashboard from './pages/employer/Dashboard/EmployerDashboard';
import EmployerProfile from './pages/employer/Profile/EmployerProfile';
import PostJob from './pages/employer/PostJob/PostJob';
import CompanyProfile from './pages/employer/CompanyProfile/CompanyProfile';
import EmployerLayout from './layouts/EmployerLayout/EmployerLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/find-work" element={<FindWork />} />
          <Route path="/hire-workers" element={<HireWorkers />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<WorkerLayout />}>
          <Route path="/worker/" element={<WorkerDashboard />} />
          <Route path="/worker/applications" element={<Applications />} />
          <Route path="/worker/find-jobs" element={<FindJobs />} />
          <Route path="/worker/messages" element={<Messages />} />
          <Route path="/worker/notifications" element={<WorkerNotifications />} />
          <Route path="/worker/profile" element={<WorkerProfile />} />
          <Route path="/worker/saved" element={<Saved />} />
        </Route>

        <Route element={<EmployerLayout />}>
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/employer/applications" element={<EmployerApplications />} />
          <Route path="/employer/find-workers" element={<FindWorkers_Emp />} />
          <Route path="/employer/messages" element={<EmployerMessages />} />
          <Route path="/employer/notifications" element={<EmployerNotifications />} />
          <Route path="/employer/profile" element={<EmployerProfile />} />
          <Route path="/employer/post-job" element={<PostJob />} />
          <Route path="/employer/company-profile" element={<CompanyProfile />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>




      </Routes>
    </BrowserRouter>
  );
}

export default App;