export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  refresh: string;
  access: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
