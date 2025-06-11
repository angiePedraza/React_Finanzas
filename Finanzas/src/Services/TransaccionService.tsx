// src/Services/TransaccionService.tsx (CORREGIDO)
import api from './api';
import type { Transaccion, Categoria, Cuenta, ApiResponse } from '../Types';

interface FiltrosTransaccion {
  fecha_inicio?: string;
  fecha_fin?: string;
  categoria_id?: number;
  tipo?: 'ingreso' | 'gasto';
  cuenta_id?: number;
}

export const TransaccionService = {
  // Obtener todas las transacciones
  getAll: async (): Promise<Transaccion[]> => {
    try {
      const response = await api.get('/transacciones');
      return (response.data as ApiResponse<Transaccion[]>).data || [];
    } catch (error) {
      console.error('Error al obtener transacciones:', error);
      throw error;
    }
  },

  // Crear nueva transacción
  create: async (data: Omit<Transaccion, 'id'>): Promise<ApiResponse<Transaccion>> => {
    try {
      const response = await api.post('/transacciones', data);
      return response.data as ApiResponse<Transaccion>;
    } catch (error) {
      console.error('Error al crear transacción:', error);
      throw error;
    }
  },

  // Actualizar transacción
  update: async (id: number, data: Partial<Transaccion>): Promise<ApiResponse<Transaccion>> => {
    try {
      const response = await api.put(`/transacciones/${id}`, data);
      return response.data as ApiResponse<Transaccion>;
    } catch (error) {
      console.error('Error al actualizar transacción:', error);
      throw error;
    }
  },

  // Eliminar transacción
  delete: async (id: number): Promise<ApiResponse<void>> => {
    try {
      const response = await api.delete(`/transacciones/${id}`);
      return response.data as ApiResponse<void>;
    } catch (error) {
      console.error('Error al eliminar transacción:', error);
      throw error;
    }
  },

  // Obtener cuentas del usuario
  getCuentas: async (): Promise<Cuenta[]> => {
    try {
      const response = await api.get('/cuentas');
      return (response.data as ApiResponse<Cuenta[]>).data || [];
    } catch (error) {
      console.error('Error al obtener cuentas:', error);
      throw error;
    }
  },

  // Obtener categorías (SOLO CONSUMIR)
  getCategorias: async (tipo?: 'ingreso' | 'gasto'): Promise<Categoria[]> => {
    try {
      const url = tipo ? `/categorias?tipo=${tipo}` : '/categorias';
      const response = await api.get(url);
      return (response.data as ApiResponse<Categoria[]>).data || [];
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  },

  // Obtener transacciones filtradas
  getFiltradas: async (filtros: FiltrosTransaccion): Promise<Transaccion[]> => {
    try {
      const response = await api.get('/transacciones/filtrar', { params: filtros });
      return (response.data as ApiResponse<Transaccion[]>).data || [];
    } catch (error) {
      console.error('Error al obtener transacciones filtradas:', error);
      throw error;
    }
  }
};