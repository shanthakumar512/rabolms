export interface User {
    username: string;
    password: string;
    email: string;
    roles: Role;
}
export interface  Role {
    name: string;
    id: number;
}
