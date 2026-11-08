export interface LoginRequest {
    username: string;
    password: string;
}

// Keycloak responde en snake_case
export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
}

export interface RegistroRequest {
    username: string;
    email: string;
    nombre: string;
    apellido: string;
    password: string;
}

// Lo que nos interesa del payload del JWT
export interface TokenPayload {
    preferred_username: string;
    exp: number;
    realm_access?: {
        roles: string[];
    };
}
