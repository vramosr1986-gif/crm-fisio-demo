const APP_TITLE = 'CRM Fisio Demo';

const MODULOS = {
  ESTUDIO: 'estudio',
  CLINICA: 'clinica',
  DOMICILIACIONES: 'domiciliaciones'
};

// Usuarios iniciales de la aplicacion (solo se usan para crear el almacen la primera vez que
// alguien inicia sesion). Una vez creado, los usuarios reales viven en Script Properties y se
// gestionan desde el menu "Usuarios" (solo visible para administradores) dentro de la app.
// Las contrasenas NO se guardan en claro, solo su hash SHA-256 con sal.
// DEMO: ambos usuarios usan la contrasena 'demo1234'. Cambiala antes de cualquier uso real.
// Para dar de alta un usuario o cambiar una contrasena a mano, ejecuta generarHashParaContrasena('nueva-contrasena')
// desde el editor de Apps Script (menu Ejecutar > seleccionar funcion), copia el hash del log y pegalo aqui.
const USERS = [
  {
    username: 'admin',
    passwordHash: '488bc39a69ba1e7c93648ec9c8e9a29830dc170b73d6275a7c3b3b4c829b6e1c',
    nombre: 'Ana',
    role: 'admin',
    modules: [MODULOS.CLINICA, MODULOS.ESTUDIO, MODULOS.DOMICILIACIONES],
    fisioFiltro: null
  },
  {
    username: 'laura',
    passwordHash: '488bc39a69ba1e7c93648ec9c8e9a29830dc170b73d6275a7c3b3b4c829b6e1c',
    nombre: 'Laura',
    role: 'fisio',
    modules: [MODULOS.CLINICA],
    fisioFiltro: 'Laura'
  }
];

const APPS = [
  {
    id: MODULOS.CLINICA,
    nombre: 'Clínica Demo',
    allowsInvoice: true,
    emisorNif: '00000000T',
    logoUrl: ''
  },
  {
    id: MODULOS.ESTUDIO,
    nombre: 'Estudio Demo',
    allowsInvoice: true,
    emisorNif: '00000000T',
    logoUrl: ''
  },
  {
    id: MODULOS.DOMICILIACIONES,
    nombre: 'Domiciliaciones',
    allowsInvoice: false,
    emisorNif: '00000000T',
    logoUrl: ''
  }
];

// IDs de hojas por modulo. Ejecuta crearDatosDemo() (src/demoSeed.js) y pega aqui los IDs que muestra el log.
const SHEETS = {
  estudio: {
    spreadsheetId: 'REEMPLAZAR_CON_ID_DE_HOJA',
    sheetName: 'Registros'
  },
  clinica: {
    spreadsheetId: 'REEMPLAZAR_CON_ID_DE_HOJA',
    sheetName: 'Registros'
  },
  domiciliaciones: {
    spreadsheetId: 'REEMPLAZAR_CON_ID_DE_HOJA',
    sheetName: 'Registros'
  }
};

const DEFAULT_IVA_PCT = 0;
const DEFAULT_IRPF_PCT = 15;

const FISIO_ALIASES = {
  laura: 'Laura',
  ana: 'Ana',
  marta: 'Marta'
};
