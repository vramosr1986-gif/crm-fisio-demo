// Genera tres hojas de calculo de demostracion con datos ficticios.
// Ejecutar una vez desde el editor de Apps Script: Ejecutar > crearDatosDemo.
// Despues, copia los IDs que aparecen en el registro de ejecucion a SHEETS en src/Config.js.

const DEMO_CLIENTES = [
  'Lucia Romero', 'Javier Molina', 'Elena Castro', 'Sergio Ortega', 'Nuria Delgado',
  'Pablo Navarro', 'Irene Vidal', 'Marcos Rubio', 'Carmen Iglesias', 'Daniel Pastor',
  'Sara Medina', 'Alberto Gil', 'Rocio Prieto', 'Hugo Santos', 'Alicia Moreno'
];
const DEMO_FISIOS = ['Ana', 'Laura', 'Marta'];
const DEMO_SERVICIOS = [
  { que: 'Fisio', precio: 40 },
  { que: 'Fisio Respi', precio: 48 },
  { que: 'Pilates', precio: 20 }
];
const DEMO_HEADERS_REGISTROS = [
  'Marca temporal', 'Fecha de la sesion', 'Hora de la sesion', 'Nombre del cliente',
  'Fisio_de_sesion', 'Sesion_o_solopago', 'Que_paga', 'Como_paga', 'Cantidad',
  'Quien_cobra', 'Numero operacion'
];
const DEMO_HEADERS_DOMICILIACIONES = [
  'Marca temporal', 'Nombre del cliente', 'Servicio', 'Importe mensual', 'Dia de cobro', 'Estado'
];

function crearDatosDemo() {
  const azar = generadorDemo(20240901);
  const ids = {
    clinica: crearHojaDemo('CRM Demo - Clinica', DEMO_HEADERS_REGISTROS, filasRegistrosDemo(azar, 260, DEMO_SERVICIOS.slice(0, 2))),
    estudio: crearHojaDemo('CRM Demo - Estudio', DEMO_HEADERS_REGISTROS, filasRegistrosDemo(azar, 180, DEMO_SERVICIOS.slice(2))),
    domiciliaciones: crearHojaDemo('CRM Demo - Domiciliaciones', DEMO_HEADERS_DOMICILIACIONES, filasDomiciliacionesDemo(azar, 12))
  };
  Logger.log('Pega estos IDs en SHEETS (src/Config.js):\n' + JSON.stringify(ids, null, 2));
  return ids;
}

function crearHojaDemo(titulo, headers, filas) {
  const ss = SpreadsheetApp.create(titulo);
  const hoja = ss.getSheets()[0];
  hoja.setName('Registros');
  hoja.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  if (filas.length) {
    hoja.getRange(2, 1, filas.length, headers.length).setValues(filas);
  }
  hoja.setFrozenRows(1);
  return ss.getId();
}

function filasRegistrosDemo(azar, total, servicios) {
  const filas = [];
  const hoy = new Date();
  for (let i = 0; i < total; i++) {
    const fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - Math.floor(azar() * 180));
    const hora = pad2Num(9 + Math.floor(azar() * 11)) + ':' + (azar() < 0.5 ? '00' : '30');
    const servicio = elegirDemo(azar, servicios);
    const fisio = elegirDemo(azar, DEMO_FISIOS);
    const esBono = azar() < 0.2;
    const comoPaga = esBono ? 'Bono' : (azar() < 0.6 ? 'Tarjeta' : 'Efectivo');
    filas.push([
      Utilities.formatDate(fecha, 'Europe/Madrid', 'dd/MM/yyyy HH:mm:ss'),
      Utilities.formatDate(fecha, 'Europe/Madrid', 'dd/MM/yyyy'),
      hora,
      elegirDemo(azar, DEMO_CLIENTES),
      fisio,
      'Sesion',
      servicio.que,
      comoPaga,
      esBono ? 0 : servicio.precio,
      fisio,
      comoPaga === 'Tarjeta' ? String(100000 + Math.floor(azar() * 900000)) : ''
    ]);
  }
  return filas.sort(function(a, b) { return a[0] < b[0] ? -1 : 1; });
}

function filasDomiciliacionesDemo(azar, total) {
  const filas = [];
  for (let i = 0; i < total; i++) {
    const servicio = elegirDemo(azar, ['Pilates mensual', 'Fisio mensual', 'Pilates + Fisio']);
    filas.push([
      Utilities.formatDate(new Date(), 'Europe/Madrid', 'dd/MM/yyyy HH:mm:ss'),
      DEMO_CLIENTES[i % DEMO_CLIENTES.length],
      servicio,
      servicio === 'Pilates mensual' ? 70 : (servicio === 'Fisio mensual' ? 150 : 200),
      elegirDemo(azar, [1, 5, 10]),
      azar() < 0.85 ? 'Activa' : 'Pausada'
    ]);
  }
  return filas;
}

function generadorDemo(semilla) {
  let estado = semilla;
  return function() {
    estado = (estado * 1103515245 + 12345) % 2147483648;
    return estado / 2147483648;
  };
}

function elegirDemo(azar, lista) {
  return lista[Math.floor(azar() * lista.length)];
}
