export class tipoEntidadRequest {
    consulta: string = '';
    mant_cod: number = 0;
    mant_nombre: string = '';
    mant_activo: number = 0;
}

export class tipoEntidad {
    tpE_COD: number = 0;
    tpE_Nombre: string = '';
    sw_Activo: number = 0;
}

export class tipoEntidadDto {
    success: boolean = false;
    message: string = '';
    tipoEntidad: tipoEntidad = new tipoEntidad();
    tiposEntidades: Array<tipoEntidad> = new Array<tipoEntidad>();
}