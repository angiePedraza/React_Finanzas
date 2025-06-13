import ResumenFinanciero from "../Components/ResumenFinanciero";
import { jwtDecode } from "jwt-decode";

interface TokenData {
  usuario_id: number;
}

function Inicio() {
  const token = localStorage.getItem("token");
  let usuario_id = 0;

  if (token) {
    const decoded = jwtDecode<TokenData>(token);
    usuario_id = decoded.usuario_id;
  }

  return (
    <div className="container mx-auto">
      {usuario_id !== 0 ? (
        <ResumenFinanciero usuario_id={usuario_id} periodo="mensual" />
      ) : (
        <p>No se pudo obtener el usuario. Por favor inicia sesión.</p>
      )}
    </div>
  );
}

export default Inicio;
