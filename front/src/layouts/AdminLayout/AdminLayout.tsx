import { Outlet } from 'react-router-dom';
import { AdminNavbar } from '../../components/admin/Navbar/AdminNavbar';
import { Footer } from '../../components/guest/Dashboard/Footer/Footer';

export default function AdminLayout() {
  return (
    <div>
      <AdminNavbar />

      <div>
        <Outlet />
      </div>

      <Footer/>
    </div>
  );
}
