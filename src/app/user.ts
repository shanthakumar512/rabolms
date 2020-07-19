import { hostViewClassName } from '@angular/compiler';

export class User {
    username: string;
    password: string;
    email: string;
    roles: Role;
}
export class  Role {
    name: string;
    id: number;
}
