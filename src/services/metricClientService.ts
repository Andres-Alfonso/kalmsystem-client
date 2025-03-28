// src/services/MetricClientService.ts
export interface ClientMetricsResponse {
    result: {
      client: ClientInfo;
      countUsers: number;
      countLastMonthUsers: number;
      countUsersActives: number;
      countLastMonthLogins: number;
    };
    message: string;
    status: number;
  }
  
  export interface ClientInfo {
    id: number;
    name: string;
    // Añade más propiedades según la estructura real de tu cliente
  }
  
  export interface RequestOptions {
    headers?: Record<string, string>;
    token?: string;
  }
  
  export class MetricClientService {
    private static instance: MetricClientService;
    private baseUrl: string;
  
    private constructor() {
      // Ajusta la URL base según tu entorno
      this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    }
  
    public static getInstance(): MetricClientService {
      if (!MetricClientService.instance) {
        MetricClientService.instance = new MetricClientService();
      }
      return MetricClientService.instance;
    }
  
    /**
     * Prepara los headers para las peticiones HTTP
     * @param options Opciones para la petición
     * @returns Headers configurados
     */
    private prepareHeaders(options?: RequestOptions): Headers {
      const headers = new Headers({
        'Content-Type': 'application/json',
      });
  
      // Añadir headers personalizados
      if (options?.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
          headers.append(key, value);
        });
      }
  
      // Añadir token de autorización si existe
      if (options?.token) {
        headers.append('Authorization', `Bearer ${options.token}`);
      }
  
      return headers;
    }
  
    /**
     * Obtiene las métricas generales de un cliente específico
     * @param clientId ID del cliente
     * @param options Opciones adicionales para la petición
     * @returns Datos de métricas del cliente
     */
    async getGeneralClientMetrics(clientId: number, options?: RequestOptions): Promise<ClientMetricsResponse> {
      try {
        const headers = this.prepareHeaders(options);
        
        const response = await fetch(`${this.baseUrl}/metrics/general/client?clientId=${clientId}`, {
          method: 'GET',
          headers,
        });
  
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({
            message: `Error HTTP: ${response.status} ${response.statusText}`
          }));
          
          throw new Error(errorData.message || 'Error al obtener métricas del cliente');
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error en MetricClientService:', error);
        throw error;
      }
    }
  
    /**
     * Obtiene las métricas de usuarios de un cliente con un desglose temporal
     * Este método es un ejemplo de cómo podrías extender el servicio
     * para añadir más funcionalidades a futuro
     */
    async getUsersTimelineMetrics(clientId: number, period: 'month' | 'year' = 'month', options?: RequestOptions): Promise<any> {
      try {
        const headers = this.prepareHeaders(options);
        
        const response = await fetch(`${this.baseUrl}/metrics/users/timeline?clientId=${clientId}&period=${period}`, {
          method: 'GET',
          headers,
        });
  
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({
            message: `Error HTTP: ${response.status} ${response.statusText}`
          }));
          
          throw new Error(errorData.message || 'Error al obtener la línea temporal de métricas');
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error en MetricClientService:', error);
        throw error;
      }
    }
  }
  
  export default MetricClientService;