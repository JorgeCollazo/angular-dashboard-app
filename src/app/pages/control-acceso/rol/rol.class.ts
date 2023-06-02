export class rolRequest {
    consulta: string = '';
    usu_accion: number = 0;
    status: number = 0;
    sw_admin: number = 0;
    rol_id: number = 0;
    descripcion: string = '';
    nivel: number = 0;
    dependiente: number = 0;
}

export class rol {
    rol_id: number = 0;
    nombre: string = '';
    status: number = 0;
    nivel: number = 0;
    sw_admin: number = 0;
    dependiente: number = 0;
}

export class rolDto {
    success: boolean = false;
    message: string = '';
    rol: rol = new rol();
    roles: Array<rol> = new Array<rol>();
}