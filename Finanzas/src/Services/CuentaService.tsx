// src/Services/CuentaService.tsx (CORREGIDO)
import api from './api';
import type { Cuenta, ApiResponse } from '../Types';

interface ResumenFinanciero {
  total_cuentas: number;
  saldo_total: number;
  cuentas_por_tipo: Array<{
    tipo_nombre: string;
    cantidad: number;
    saldo_total: number;
  }>;
}

export const CuentaService = {
  // Obtener todas las cuentas del usuario
  getAll: async (): Promise<Cuenta[]> => {
    try {
      const response = await api.get('/cuenta');
      return (response.data as ApiResponse<Cuenta[]>).data || [];
    } catch (error) {
      console.error('Error al obtener cuentas:', error);
      throw error;
    }
  },

  // Obtener cuenta por ID
  getById: async (id: number): Promise<Cuenta | null> => {
    try {
      const response = await api.get(`/cuenta/${id}`);
      return (response.data as ApiResponse<Cuenta>).data || null;
    } catch (error) {
      console.error('Error al obtener cuenta:', error);
      throw error;
    }
  },

  // Crear nueva cuenta
  create: async (data: Omit<Cuenta, 'id' | 'usuario_id'>): Promise<ApiResponse<Cuenta>> => {
    try {
      const response = await api.post('/cuenta', data);
      return response.data as ApiResponse<Cuenta>;
    } catch (error) {
      console.error('Error al crear cuenta:', error);
      throw error;
    }
  },

  // Actualizar cuenta
  update: async (id: number, data: Partial<Cuenta>): Promise<ApiResponse<Cuenta>> => {
    try {
      const response = await api.put(`/cuenta/${id}`, data);
      return response.data as ApiResponse<Cuenta>;
    } catch (error) {
      console.error('Error al actualizar cuenta:', error);
      throw error;
    }
  },

  // Eliminar cuenta
  delete: async (id: number): Promise<ApiResponse<void>> => {
    try {
      const response = await api.delete(`/cuenta/${id}`);
      return response.data as ApiResponse<void>;
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
      throw error;
    }
  },

  // Obtener resumen financiero
  getResumen: async (): Promise<ResumenFinanciero> => {
    try {
      const response = await api.get('/resumen-financiero');
      return (response.data as ApiResponse<ResumenFinanciero>).data || {
        total_cuentas: 0,
        saldo_total: 0,
        cuentas_por_tipo: []
      };
    } catch (error) {
      console.error('Error al obtener resumen financiero:', error);
      throw error;
    }
  }
};