// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/loginPage.tsx';
import RegistroU from './Pages/RegistroU.tsx';
import Inicio from './Pages/inicio.tsx';
import PrivateLayout from './Layouts/PrivateLayout.tsx';
import Transacciones from './Pages/Transacciones.tsx';
import Cuenta from './Pages/Cuenta.tsx';
import Categoria from './Pages/Categoria.tsx';
import Historial from './Pages/Historial.tsx';

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
          <Route path="/Transacion" element={<Transacciones />} />
          <Route path="/Cuenta" element={<Cuenta />} />
          <Route path="/Categoria" element={<Categoria />} />
          <Route path="/Historial" element={<Historial />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
