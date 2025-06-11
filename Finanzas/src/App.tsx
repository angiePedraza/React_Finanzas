// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/loginPage.tsx';
import RegistroU from './Pages/RegistroU.tsx';
import Inicio from './Pages/inicio.tsx';
import PrivateLayout from './Layouts/PrivateLayout.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página pública: login */}
        <Route path="/" element={<LoginPage />} />

        {/* Rutas privadas (con Navbar) */}
        <Route element={<PrivateLayout />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/RegistroU" element={<RegistroU />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
