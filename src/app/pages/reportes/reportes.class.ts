export class rpt_premiosinst {
    id: number = 0;
    id_Estacion: number = 0;
    id_Juego: number = 0;
    puntaje: number = 0;
    dificultad: number = 0;
    fechaCrea: string = '';
}
export class ReportesDto {
    success: boolean = false;
    message: string = '';
    premioInst: rpt_premiosinst = new rpt_premiosinst();
    premiosInst: Array<rpt_premiosinst> = new Array<rpt_premiosinst>();
}