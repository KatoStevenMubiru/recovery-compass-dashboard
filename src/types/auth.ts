export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  anonymous_name: string;
  student_id: string;
  role: string;
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

export interface RegisterCredentials {
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  anonymous_name: string;
  student_id: string;
  program: string;
  emergency_contact: string;
}
