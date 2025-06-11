// src/Types/index.ts
export interface TipoCuenta {
  id?: number;
  nombre: string;
}

export interface Cuenta {
  id?: number;
  usuario_id: number;
  nombre: string;
  tipo_cuenta_id: number;
  saldo: number;
  tipo_cuenta_nombre?: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  tipo: 'ingreso' | 'gasto';
}

export interface Transaccion {
  id?: number;
  cuenta_id: number;
  categoria_id: number;
  tipo: 'ingreso' | 'gasto';
  monto: number;
  fecha: string;
  descripcion?: string;
  cuenta_nombre?: string;
  categoria_nombre?: string;
}

// Interfaces para respuestas de API
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// Interface para filtros de transacciones
export interface FiltrosTransaccion {
  fecha_inicio?: string;
  fecha_fin?: string;
  categoria_id?: number;
  tipo?: 'ingreso' | 'gasto';
  cuenta_id?: number;
}

// Interface para resumen financiero
export interface ResumenFinanciero {
  total_cuentas: number;
  saldo_total: number;
  cuentas_por_tipo: Array<{
    tipo_nombre: string;
    cantidad: number;
    saldo_total: number;
  }>;
}

// Interfaces para formularios
export interface FormularioTipoCuentaProps {
  onSubmit: (data: TipoCuenta) => void;
  onCancel: () => void;
  initialData?: TipoCuenta;
}

export interface FormularioCuentaProps {
  onSubmit: (data: Cuenta) => void;
  onCancel: () => void;
  initialData?: Cuenta;
  tiposCuenta: TipoCuenta[];
}

export interface FormularioTransaccionProps {
  onSubmit: (data: Transaccion) => void;
  onCancel: () => void;
  initialData?: Transaccion;
  categorias: Categoria[];
  cuentas: Cuenta[];
}