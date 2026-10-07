function estudio_getResumen(token) {
  requireAuthorizedSession(token, MODULOS.ESTUDIO);
  return getResumenGenericoPorModulo(MODULOS.ESTUDIO);
}

function estudio_getFilas(token) {
  requireAuthorizedSession(token, MODULOS.ESTUDIO);
  return getFilasGenericoPorModulo(MODULOS.ESTUDIO);
}
