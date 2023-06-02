import Integer from "@zxing/library/esm/core/util/Integer";
import { int } from "@zxing/library/esm/customTypings";

export class SeleccionMesa {
    consulta: string = "";
    id_usuario: Integer = 0;
    id_acta: Integer = 0;
    id_prov: Integer = 0;
    id_circ: string = "";
    id_dist: Integer = 0;
    id_corr: Integer = 0;
    id_centro: string = "";
    id_mesa: string = "";
    fecha_hora: string = "";
    foto: string = "";
}