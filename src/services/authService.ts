// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // URL de tu API NestJS

// Tipos de datos para la autenticación
export interface User {
  id: string;
  email: string;
  client: number;
  roles: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  client: number | null;
}

// Estado inicial de autenticación
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
  client: null,
};

// Clase para manejar la autenticación
class AuthService {
  private state: AuthState = { ...initialState };
  private listeners: Array<(state: AuthState) => void> = [];

  constructor() {
    // Intenta restaurar la sesión desde localStorage al iniciar
    this.restoreSession();
    
    // Configura interceptor para refresh token
    this.setupAxiosInterceptors();
  }

  // Obtiene el estado actual
  getState(): AuthState {
    return { ...this.state };
  }

  // Suscribe listeners para cambios de estado
  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    listener(this.state);
    
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notifica a los listeners sobre cambios
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Guarda la sesión en localStorage
  private saveSession(): void {
    localStorage.setItem('authState', JSON.stringify({
      token: this.state.token,
      refreshToken: this.state.refreshToken,
      user: this.state.user,
      isAuthenticated: this.state.isAuthenticated,
      client: this.state.client
    }));
  }

  // Restaura la sesión desde localStorage
  private restoreSession(): void {
    const savedState = localStorage.getItem('authState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        this.state = {
          ...this.state,
          ...parsedState
        };
        
        // Si hay un token, configura los headers de axios
        if (this.state.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`;
        }
        
        this.notifyListeners();
      } catch (e) {
        console.error('Error al restaurar la sesión:', e);
        this.clearSession();
      }
    }
  }

  // Limpia la sesión
  clearSession(): void {
    this.state = { ...initialState };
    localStorage.removeItem('authState');
    delete axios.defaults.headers.common['Authorization'];
    this.notifyListeners();
  }

  // Configura interceptores para manejar refresh token automáticamente
  private setupAxiosInterceptors(): void {
    axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        
        // Si es error 401 (no autorizado) y no es una petición de refresh
        if (error.response?.status === 401 && 
            !originalRequest._retry &&
            this.state.refreshToken &&
            originalRequest.url !== `${API_URL}/auth/refresh`) {
          
          originalRequest._retry = true;
          
          try {
            // Intenta obtener un nuevo token usando el refreshToken
            const response = await axios.post(`${API_URL}/auth/refresh`, {
              refreshToken: this.state.refreshToken
            });
            
            // Guarda los nuevos tokens
            const { accessToken, refreshToken } = response.data;
            this.state.token = accessToken;
            this.state.refreshToken = refreshToken;
            
            // Actualiza el token en los headers y guarda la sesión
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            this.saveSession();
            this.notifyListeners();
            
            // Reintenta la petición original con el nuevo token
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error('Error al refrescar el token:', refreshError);
            // Si falla el refresh, elimina la sesión
            this.clearSession();
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Valida un token recibido por parámetro URL
  async validateExternalToken(token: string): Promise<boolean> {
    try {
      // Valida el token con el backend de NestJS
      const response = await axios.post(`${API_URL}/auth/validate`, { token });

      console.log(response);
      
      // Establece el nuevo estado de autenticación
      const { user, accessToken, refreshToken, client } = response.data;
      
      this.state = {
        isAuthenticated: true,
        client,
        user,
        token: accessToken,
        refreshToken
      };
      
      // Configura el token en los headers de axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      // Guarda la sesión y notifica a los listeners
      this.saveSession();
      this.notifyListeners();
      
      return true;
    } catch (error) {
      console.error('Error al validar el token:', error);
      this.clearSession();
      return false;
    }
  }

  // Verifica si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    return !!this.state.user?.roles?.includes(role);
  }

  // Verifica si el usuario tiene al menos uno de los roles especificados
  hasAnyRole(roles: string[]): boolean {
    if (!this.state.user?.roles) return false;
    return roles.some(role => this.state.user?.roles.includes(role));
  }

  // Verifica si el token actual es válido
  async checkTokenValidity(): Promise<boolean> {
    if (!this.state.token) return false;
    
    try {
      await axios.get(`${API_URL}/auth/me`);
      return true;
    } catch (error) {
      // Si hay un error 401, el token no es válido
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }
      // Para otros errores, asumimos que el token es válido
      return true;
    }
  }
}

// Exporta una única instancia del servicio
export const authService = new AuthService();