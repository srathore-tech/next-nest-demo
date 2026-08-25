import { AuthResponse, LoginPayload } from "@/types/auth.types";
import { api } from "./axios";



export const apiCollection = {
    login:async(payload:LoginPayload):Promise<AuthResponse>=>{
    return await api.post("/auth/login",payload)
    }
}