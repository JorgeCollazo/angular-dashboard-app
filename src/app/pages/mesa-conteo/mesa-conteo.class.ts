export class EncuestaRequest {
    id_usuario: number = 0;
    cedula: string = '';
    mayor_edad: number = 0;
    edad: number = 0;
    sexo: string = '';
    provincia: string = '';
    distrito: string = '';
    corregimiento: string = '';
    p_7: string = '';
    p_8: number = 0;
    p_9: string = '';
    p_10_1: number = 0;
    p_10_2: number = 0;
    p_10_3: number = 0;
    p_10_4: number = 0;
    p_10_5: number = 0;
    p_10_6: number = 0;
    p_10_7: number = 0;
    p_10_8: number = 0;
    p_10_9: number = 0;
    p_10_10: number = 0;
    p_10_11: string = '';
    p_11: number = 0;
    p_12: number = 0;
    p_13: string = '';
    p_14_1: number = 0;
    p_14_2: number = 0;
    p_14_3: number = 0;
    p_14_4: number = 0;
    p_14_5: number = 0;
    p_14_6: number = 0;
    p_14_7: number = 0;
    p_14_8: number = 0;
}


export class ProvinciaDto {
    success: boolean = false;
    message: string = '';
    provinciasList: Array<Provincia> = new Array();
}
export class DistritoDto {
    success: boolean = false;
    message: string = '';
    distritosList: Array<Distrito> = new Array<Distrito>();
}
export class CorregimientoDto {
    success: boolean = false;
    message: string = '';
    corregimientosList: Array<Corregimiento> = new Array<Corregimiento>();
}
export class Provincia {
    id_provincia: number = 0;
    nombre: string = '';
}
export class Distrito {
    id_provincia: number = 0;
    id_distrito: number = 0;
    nombre: string = '';
}
export class Corregimiento {
    id_provincia: number = 0;
    id_distrito: number = 0;
    id_corregimiento: number = 0;
    nombre: string = '';
}

export class CentrosDto {
    success: boolean = false;
    message: string = '';
    centrosList: Array<Centros> = new Array<Centros>();
}
export class MesasDto {
    success: boolean = false;
    message: string = '';
    mesainfoList: Array<Mesas> = new Array<Mesas>();
}
export class Centros {
    id_centro: number = 0;
    nombre: string = '';
}
export class Mesas {
    id_mesa: number = 0;
    pin: number = 0;
}

export class candidatos {    
    id_candidato: number=0;
    nombre: string='';
    foto: string='';
    votos: string='';
}

export class candidatosDto {
    success: boolean = false;
    message: string = '';
    candidatos: string ='';
    candidatosList: Array<candidatos> = new Array<candidatos>();
}

export class MesaSelDto {
    success: boolean = false;
    message: string = '';
    MesaActa: Array<SelMesa> = new Array<SelMesa>();
}

export class SelMesa {
    consulta: string = "";
    id_usuario: number = 0;
    id_acta: number = 0;
    id_prov: number = 0;
    id_circ: string = "";
    id_dist: number = 0;
    id_corr: number = 0;
    id_centro: string = "";
    id_mesa: string = "";
    fecha_hora: string = "";
    foto: string = "";
}
