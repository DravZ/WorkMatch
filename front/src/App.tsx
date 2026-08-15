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
import Notifications from './pages/worker/Notifications/Notifications';
import WorkerProfile from './pages/worker/Profile/WorkerProfile';
import Saved from './pages/worker/Saved/Saved';
import WorkerLayout from './layouts/WorkerLayout/WorkerLayout';

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
          <Route path="/worker/notifications" element={<Notifications />} />
          <Route path="/worker/profile" element={<WorkerProfile />} />
          <Route path="/worker/saved" element={<Saved />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;