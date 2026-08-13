import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/guest/shared/Navbar/Navbar';

export default function GuestLayout() {
  return (
    <div>
      <Navbar />

      <div>
        <Outlet />
      </div>
    </div>
  );
}
