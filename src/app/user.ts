export interface User {
    username:String;
    password:String;
    email:String;
    roles:Role;
}
export interface  Role{
    name:String;
    id:number;
}