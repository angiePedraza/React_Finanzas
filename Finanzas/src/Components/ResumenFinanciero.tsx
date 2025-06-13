import React, { useEffect, useState } from "react";
import axios from "../Services/api"; // Usa el cliente axios con token automático
import { jwtDecode } from "jwt-decode";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#A28BE7"];

interface CategoriaResumen {
  categoria: string;
  total: string;
  tipo: "ingreso" | "gasto";
  periodo: number;
}

interface DecodedToken {
  usuario_id: string;
  [key: string]: any;
}

interface Props {
  periodo: "mensual" | "semanal";
}

const ResumenFinanciero: React.FC<Props> = ({ periodo }) => {
  const [categorias, setCategorias] = useState<CategoriaResumen[]>([]);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUsuarioId(decoded.usuario_id);
      } catch (err) {
        console.error("Token inválido:", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchResumen = async () => {
      if (!usuarioId) return;
      try {
        const response = await axios.get<CategoriaResumen[]>(
          "/resumen",
          {
            params: { usuario_id: usuarioId, periodo }
          }
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener el resumen:", error);
      }
    };

    fetchResumen();
  }, [usuarioId, periodo]);

  if (!categorias.length) return <p className="p-4">Cargando resumen...</p>;

  const ingresos = categorias.filter(c => c.tipo === "ingreso");
  const gastos = categorias.filter(c => c.tipo === "gasto");

  const totalIngresos = ingresos.reduce((sum, i) => sum + Number(i.total), 0);
  const totalGastos = gastos.reduce((sum, g) => sum + Number(g.total), 0);
  const balance = totalIngresos - totalGastos;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Resumen {periodo}</h2>
      <div className="mb-4">
        <p>Ingresos totales: ${totalIngresos.toFixed(2)}</p>
        <p>Gastos totales: ${totalGastos.toFixed(2)}</p>
        <p>
          Balance:{" "}
          <span className={balance >= 0 ? "text-green-600" : "text-red-600"}>
            ${balance.toFixed(2)} ({balance >= 0 ? "Superávit" : "Déficit"})
          </span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pastel de gastos */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Distribución de Gastos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={gastos}
                dataKey={(entry) => Number(entry.total)}
                nameKey="categoria"
                outerRadius={80}
                label
              >
                {gastos.map((entry, index) => (
                  <Cell key={`cell-gasto-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Barras de ingresos */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Ingresos por Categoría</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ingresos.map(i => ({
              ...i,
              total: Number(i.total)
            }))}>
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#00C49F" name="Ingresos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ResumenFinanciero;
