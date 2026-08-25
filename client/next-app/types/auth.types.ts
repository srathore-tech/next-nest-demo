import { User } from "./user.types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}


// export interface AuthResponse {
  // success: boolean;
  // message: string;
  // user?: User;
// }