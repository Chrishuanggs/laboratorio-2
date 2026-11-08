// Usuario registrado en Keycloak (por eso firstName y lastName vienen en inglés)
export interface UsuarioInfo {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}
