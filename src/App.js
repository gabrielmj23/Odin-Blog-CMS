import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <header>
        <nav className='navbar navbar-expand-lg mb-3' style={{
          backgroundColor: '#0aa2c0'
        }}>
          <a className='navbar-brand text-dark mx-auto fs-3' href='/'><strong>Odin Blog - CMS</strong></a>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
