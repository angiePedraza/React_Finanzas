import React, { useEffect, useState } from "react";
import axios from "../Services/api"; // Axios configurado con token
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#A28BE7"];

interface CategoriaResumen {
  categoria: string;
  total: string | number;
  tipo: "ingreso" | "gasto";
  periodo: number | string;
}

interface Props {
  usuario_id: number;
  periodo: "mensual" | "semanal";
  onPeriodoChange?: (p: "mensual" | "semanal") => void;
}

const ResumenFinanciero: React.FC<Props> = ({ usuario_id, periodo, onPeriodoChange }) => {
  const [categorias, setCategorias] = useState<CategoriaResumen[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumen = async () => {
      if (!usuario_id || usuario_id <= 0) {
        console.warn("⛔ usuario_id inválido:", usuario_id);
        setError("ID de usuario inválido.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<CategoriaResumen[]>("/resumen", {
          params: { usuario_id, periodo }
        });

        const dataConNumeros = response.data.map(c => ({
          ...c,
          total: Number(c.total),
        }));

        setCategorias(dataConNumeros);
      } catch (err) {
        console.error("❌ Error al obtener el resumen:", err);
        setError("Error al obtener los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchResumen();
  }, [usuario_id, periodo]);

  if (loading) return <p className="p-4">Cargando resumen...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!categorias.length) return <p className="p-4">No hay datos para mostrar.</p>;

  const ingresos = categorias.filter(c => c.tipo === "ingreso");
  const gastos = categorias.filter(c => c.tipo === "gasto");

  const totalIngresos = ingresos.reduce((sum, i) => sum + Number(i.total), 0);
  const totalGastos = gastos.reduce((sum, g) => sum + Number(g.total), 0);
  const balance = totalIngresos - totalGastos;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Resumen {periodo}</h2>
        {onPeriodoChange && (
          <select
            value={periodo}
            onChange={(e) => onPeriodoChange(e.target.value as "mensual" | "semanal")}
            className="border rounded px-2 py-1"
          >
            <option value="mensual">Mensual</option>
            <option value="semanal">Semanal</option>
          </select>
        )}
      </div>

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
        <div>
          <h3 className="font-semibold text-lg mb-2">Distribución de Gastos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={gastos}
                dataKey="total"
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

        <div>
          <h3 className="font-semibold text-lg mb-2">Ingresos por Categoría</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ingresos}>
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
