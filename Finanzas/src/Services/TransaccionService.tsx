/* eslint-disable @typescript-eslint/no-explicit-any */
// src/Services/TransaccionService.tsx - CORREGIDO
import { AuthService } from './AuthService';
import type { Transaccion, Categoria, Cuenta, ApiResponse } from '../Types';

const BASE_URL = 'http://localhost:8000';

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
      const token = AuthService.getToken();
      const response = await fetch(`${BASE_URL}/transacciones`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data.success ? data.data || [] : [];
    } catch (error) {
      console.error('Error al obtener transacciones:', error);
      throw error;
    }
  },

  // Crear nueva transacción
  create: async (data: Omit<Transaccion, 'id'>): Promise<ApiResponse<Transaccion>> => {
    try {
      const token = AuthService.getToken();
      const response = await fetch(`${BASE_URL}/transacciones`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error al crear transacción:', error);
      throw error;
    }
  },

  // Actualizar transacción
  update: async (id: number, data: Partial<Transaccion>): Promise<ApiResponse<Transaccion>> => {
    try {
      const token = AuthService.getToken();
      const response = await fetch(`${BASE_URL}/transacciones/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error al actualizar transacción:', error);
      throw error;
    }
  },

  // Eliminar transacción
  delete: async (id: number): Promise<ApiResponse<void>> => {
    try {
      const token = AuthService.getToken();
      const response = await fetch(`${BASE_URL}/transacciones/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error al eliminar transacción:', error);
      throw error;
    }
  },

  // Obtener cuentas del usuario
  getCuentas: async (): Promise<Cuenta[]> => {
    try {
      const token = AuthService.getToken();
      const response = await fetch(`${BASE_URL}/cuenta`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data.success ? data.data || [] : [];
    } catch (error) {
      console.error('Error al obtener cuentas:', error);
      throw error;
    }
  },

  // Obtener categorías
  getCategorias: async (tipo?: 'ingreso' | 'gasto'): Promise<Categoria[]> => {
    try {
      const token = AuthService.getToken();
      const url = tipo ? `${BASE_URL}/categorias?tipo=${tipo}` : `${BASE_URL}/categorias`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (data.success && data.data) {
        // Convertir idCategoria a id para compatibilidad
        return data.data.map((cat: any) => ({
          ...cat,
          id: cat.idCategoria || cat.id
        }));
      }
      return [];
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  },

  // Obtener transacciones filtradas
  getFiltradas: async (filtros: FiltrosTransaccion): Promise<Transaccion[]> => {
    try {
      const token = AuthService.getToken();
      const params = new URLSearchParams();
      Object.entries(filtros).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
      
      const response = await fetch(`${BASE_URL}/transacciones/filtrar?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data.success ? data.data || [] : [];
    } catch (error) {
      console.error('Error al obtener transacciones filtradas:', error);
      throw error;
    }
  }
};