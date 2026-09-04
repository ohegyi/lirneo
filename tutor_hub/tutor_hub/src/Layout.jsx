import { Outlet } from 'react-router-dom';
import { Navbar } from './assets/Navbar';
export default function Layout() {
  return (
    <div style={{ display: 'flex',minHeight: '100vh', width:'100vw'}}>
      <Navbar style={{position:'absolute', left:0}}/>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}