import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div>
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: 'var(--heading-color)',
            color: 'var(--background-color)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          },
          success: {
            duration: 2500,
            iconTheme: {
              primary: '#2dd4bf',
              secondary: 'var(--card-bg-color)',
            },
          },
        }}
      />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;