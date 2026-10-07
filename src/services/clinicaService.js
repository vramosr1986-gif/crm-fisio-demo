function clinica_getResumen(token) {
  requireAuthorizedSession(token, MODULOS.CLINICA);
  return getResumenGenericoPorModulo(MODULOS.CLINICA);
}

function clinica_getFilas(token) {
  requireAuthorizedSession(token, MODULOS.CLINICA);
  return getFilasGenericoPorModulo(MODULOS.CLINICA);
}
