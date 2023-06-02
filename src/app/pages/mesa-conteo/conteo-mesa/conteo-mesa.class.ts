import Integer from "@zxing/library/esm/core/util/Integer";
import { int } from "@zxing/library/esm/customTypings";

export class MesaInformacionRequest {
    cedula_afiliado: string = '';
    nombre: string = '';
    provincia: string = '';
    id_circ: string = '';
    distrito: string = '';
    corregimiento: string = '';
    id_centro: string = '';
    centro: string = '';
    id_mesa: string = '';
    sw_consultado: Integer = 0;
}

export class AsistenciaPost {
    consulta: string = '';
    id_usuario: Integer = 0;
    cedula_afiliado: string = '';
    id_centro_votacion: string = '';
    sw_voto: Integer = 0;
    sw_encontrado: Integer = 0;
    sw_consultado: Integer = 0;
}
export class CedulaResult {
    success: boolean = false;
    sw_consultado: Integer = 0;
}