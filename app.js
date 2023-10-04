let autosImportados = require("./autos");

let concesionaria = {
   autos: autosImportados,
   buscarAuto: function(patenteAuto){
    return this.autos.find(({patente}) => patenteAuto === patente ) || null;
   },
   venderAuto: function(patenteAuto){
    let resultado;
    let autoEncontrado = this.buscarAuto(patenteAuto);
    if (autoEncontrado) {
        if(autoEncontrado.vendido == false){
            autoEncontrado.vendido = true;
            resultado = autoEncontrado;
        } else {
            resultado = "El auto ha sido vendido";
        }
    }   else {
        resultado = "El auto no existe";
    }
    return resultado;
   },
   autosParaLaVenta: function(){
    return this.autos.filter((autos) => autos.vendido == false);
   },
   autosNuevos: function(){
    let autosDisponibles = this.autosParaLaVenta();
    return autosDisponibles.filter((auto) => auto.km < 100);
  },
  listaDeVentas: function(){
    let autosVendidos = this.autos.filter((auto) => auto.vendido)
    let precioDeVenta = autosVendidos.map((auto) => auto.precio);
    return precioDeVenta;
 },
  totalDeVentas: function(){
    return this.listaDeVentas().reduce((total, auto) => total + auto, 0); 
  },
  puedeComprar: function(auto, persona){
      if(auto.precio > persona.capacidadDePagoTotal){
          return false;
      }
      let valorCuota = auto.precio / auto.cuotas;
      if(valorCuota > persona.capacidadDePagoEnCuotas){
          return false;
      }
      return true;
  },
  autosQuePuedeComprar: function(persona){
    let listaAutosDisponibles = this.autosParaLaVenta();
    let listaAutosFiltrada = listaAutosDisponibles.filter(auto => this.puedeComprar(auto, persona));
    return listaAutosFiltrada;
 }
};