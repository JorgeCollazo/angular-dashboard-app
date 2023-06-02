export class UserRequest {
    consulta: string = '';
    nombre: string = '';
    usu_accion: number = 0;
    status: number = 0;
    sw_admin: number = 0;
    usuario_id: number = 0;
    rol_id: number = 0;
    usuario: string = '';
    contrasena: string = '';
}

export class User{
    status: number = 0;
    usuario_id: number = 0;
    rol_id: number = 0;
    nombre: string = '';
    usuario: string = '';
    rol: string = '';
    sw_admin: number = 0;
}

export class UserDto {
    success: boolean = false;
    message: string = '';
    usuario: User = new User();
    usuarios: Array<User> = new Array<User>();
}