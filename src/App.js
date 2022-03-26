import { Outlet } from "react-router-dom";

function App() {
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
