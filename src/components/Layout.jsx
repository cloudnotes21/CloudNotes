import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div>
      <Navbar />
      {/* This main tag will act as a container for all our page content */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;