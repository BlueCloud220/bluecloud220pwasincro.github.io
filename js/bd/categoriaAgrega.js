import { bdEjecuta } from "../../lib/js/bdEjecuta.js";
import { creaIdCliente } from "../../lib/js/creaIdCliente.js";
import { ALMACEN_CATEGORIA, Bd } from "./Bd.js";
import { validaNombre } from "../modelo/validaNombre.js";
import { validaDescripcion } from "../modelo/validaDescripcion.js";
import { validaEstado } from "../modelo/validaEstado.js";
import { exportaAHtml } from "../../lib/js/exportaAHtml.js";

/**
 * @param {import("../modelo/CATEGORIA.js").CATEGORIA} modelo
 */
export async function categoriaAgrega(modelo) {
  validaNombre(modelo.CAT_NOMBRE);
  validaDescripcion(modelo.CAT_DESCRIPCION);
  validaEstado(modelo.CAT_ESTADO);
  modelo.CAT_MODIFICACION = Date.now();
  modelo.CAT_ELIMINADA = 0;
  // Genera id único en internet.
  modelo.CAT_ID = creaIdCliente(Date.now().toString());
  return bdEjecuta(Bd, [ALMACEN_CATEGORIA], (transaccion) => {
    const almacenCategoria = transaccion.objectStore(ALMACEN_CATEGORIA);
    almacenCategoria.add(modelo);
  });
}

exportaAHtml(categoriaAgrega);
