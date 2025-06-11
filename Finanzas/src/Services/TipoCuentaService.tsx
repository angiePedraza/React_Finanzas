// src/Services/TipoCuentaService.tsx (CORREGIDO)
import api from './api';
import type { TipoCuenta, ApiResponse } from '../Types';

export const TipoCuentaService = {
  // Obtener todos los tipos de cuenta
  getAll: async (): Promise<TipoCuenta[]> => {
    try {
      const response = await api.get('/tipos-cuenta');
      return (response.data as ApiResponse<TipoCuenta[]>).data || [];
    } catch (error) {
      console.error('Error al obtener tipos de cuenta:', error);
      throw error;
    }
  },

  // Obtener tipo de cuenta por ID
  getById: async (id: number): Promise<TipoCuenta | null> => {
    try {
      const response = await api.get(`/tipos-cuenta/${id}`);
      return (response.data as ApiResponse<TipoCuenta>).data || null;
    } catch (error) {
      console.error('Error al obtener tipo de cuenta:', error);
      throw error;
    }
  },

  // Crear nuevo tipo de cuenta
  create: async (data: TipoCuenta): Promise<ApiResponse<TipoCuenta>> => {
    try {
      const response = await api.post('/tipos-cuenta', data);
      return response.data as ApiResponse<TipoCuenta>;
    } catch (error) {
      console.error('Error al crear tipo de cuenta:', error);
      throw error;
    }
  },

  // Actualizar tipo de cuenta
  update: async (id: number, data: TipoCuenta): Promise<ApiResponse<TipoCuenta>> => {
    try {
      const response = await api.put(`/tipos-cuenta/${id}`, data);
      return response.data as ApiResponse<TipoCuenta>;
    } catch (error) {
      console.error('Error al actualizar tipo de cuenta:', error);
      throw error;
    }
  },

  // Eliminar tipo de cuenta
  delete: async (id: number): Promise<ApiResponse<void>> => {
    try {
      const response = await api.delete(`/tipos-cuenta/${id}`);
      return response.data as ApiResponse<void>;
    } catch (error) {
      console.error('Error al eliminar tipo de cuenta:', error);
      throw error;
    }
  }
};