export class EntidadRequest {
    consulta: string = '';
    mant_cod: number = 0;
    mant_nombre: string = '';
    mant_activo: number = 0;
}

export class Entidad {
    enT_ID: number = 0;
    enT_cod: string = '';
    enT_TPE_COD: number = 0;
    enT_Nombre: string = '';
    Sw_Activo: number = 0;
}

export class EntidadDto {
    success: boolean = false;
    message: string = '';
    Entidad: Entidad = new Entidad();
    Entidades: Array<Entidad> = new Array<Entidad>();
}