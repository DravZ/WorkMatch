import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/guest/Dashboard/Dashboard';
import FindWork from './pages/guest/FindWork/FIndWork';
import HireWorkers from './pages/guest/HireWorkers/HireWorkers';
import HowItWorks from './pages/guest/HowItWorks/HowItWorks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-work" element={<FindWork />} />
        <Route path="/hire-workers" element={<HireWorkers />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;