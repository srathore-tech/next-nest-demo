import { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth.types";
import { api } from "@/api/axios";



export const authService = {
    login:async(payload:LoginPayload):Promise<AuthResponse>=>{
    return await api.post("/auth/login",payload)
    },
    register:async(payload:RegisterPayload):Promise<AuthResponse>=>{
    return await api.post("/auth/register",payload)
    }
}


