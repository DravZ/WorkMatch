import { Outlet } from 'react-router-dom';
import { WorkerNavbar } from '../../components/worker/shared/WorkerNavbar';
import { Footer } from '../../components/guest/Dashboard/Footer/Footer';

export default function WorkerLayout() {
  return (
    <div>
      <WorkerNavbar />

      <div>
        <Outlet />
      </div>

      <Footer/>
    </div>
  );
}
