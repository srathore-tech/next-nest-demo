export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AuthInfoResponse {
  message: string;
}

// Backward compatibility alias
export type AuthResponse = LoginResponse;
