import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ResumenFinanciero from "../Components/ResumenFinanciero";

interface TokenData {
  sub: number; // El ID del usuario está en el campo "sub"
}

function Inicio() {
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [periodo, setPeriodo] = useState<"mensual" | "semanal">("mensual");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<TokenData>(token);
        setUsuarioId(decoded.sub); // Aquí se usa 'sub'
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

  if (usuarioId === null) {
    return <p className="p-4">Cargando usuario...</p>;
  }

  return (
    <div className="container mx-auto">
      <ResumenFinanciero
        usuario_id={usuarioId}
        periodo={periodo}
        onPeriodoChange={setPeriodo}
      />
    </div>
  );
}


export default Inicio;
