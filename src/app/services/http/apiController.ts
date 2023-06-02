/* Rutas para consumir. */
export class ApiController {
    public urlMenu = 'api/Menu/';

    public urlRol = 'api/Rol/';
    public urlMenuPorRolByRol = 'api/MenuRol/menu-rol-ByRol/';
    public urlMenuPorRol = 'api/MenuRol/';

    public urlUser = 'api/Usuario/';

    public urlMenuPorUsuarioById = 'api/MenuUsuario/menu-user-ByUser/';
    public urlMenuPorUsuario = 'api/MenuUsuario/';

    // entidades
    public urlTipoEntidad = 'api/TipoEntidad/';

    public urlEntidad = 'api/Entidad/';

    public urlDepartamento = 'api/Departamento/';

    // Premios instantaneos
    public urlPremioInst = 'api/PremioInst/';

    // Ubicaciones
    public urlProvincia = 'api/GetPDC/';
    public urlDistrito = 'api/GetPDC/getDistritos/';
    public urlCorregimiento = 'api/GetPDC/getCorregimientos/';
    public urlCentro = 'api/GetPDC/getCentros/';
    public urlMesas = 'api/GetPDC/getMesas/';
    
    // seleccion mesa
    public urlSelMesa = 'api/Mesas/SeleccionMesa/';
    // mesaconteo
    public urlmesaconteo = 'api/MesaConteo/';


    //candidato
    public urlcandidato = 'api/Candidato/'


}