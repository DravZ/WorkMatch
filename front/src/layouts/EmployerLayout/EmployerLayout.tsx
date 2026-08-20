import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/guest/Dashboard/Footer/Footer';
import { EmployerNavbar } from '../../components/employer/shared/Navbar/EmployerNavbar';

export default function EmployerLayout() {
  return (
    <div>
      <EmployerNavbar />

      <div>
        <Outlet />
      </div>

      <Footer/>
    </div>
  );
}
