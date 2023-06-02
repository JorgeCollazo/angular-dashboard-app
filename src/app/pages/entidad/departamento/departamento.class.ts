export class DepartamentoRequest {
    consulta: string = '';
    mant_cod: number = 0;
    mant_nombre: string = '';
    mant_activo: number = 0;
}

export class Departamento {
    dep_Id: number = 0;
    dep_Cia_Id: number = 0;
    dep_nombre: string = '';
    dep_SwActivo: number = 0;
}

export class DepartamentoDto {
    success: boolean = false;
    message: string = '';
    departamento: Departamento = new Departamento();
    departamentos: Array<Departamento> = new Array<Departamento>();
}