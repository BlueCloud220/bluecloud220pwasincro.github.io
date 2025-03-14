import { bdEjecuta } from "../../lib/js/bdEjecuta.js";
import { exportaAHtml } from "../../lib/js/exportaAHtml.js";
import { validaId } from "../modelo/validaId.js";
import { validaNombre } from "../modelo/validaNombre.js";
import { validaDescripcion } from "../modelo/validaDescripcion.js";
import { validaEstado } from "../modelo/validaEstado.js";
import { ALMACEN_CATEGORIA, Bd } from "./Bd.js";
import { categoriaBusca } from "./categoriaBusca.js";

/**
 * @param { import("../modelo/CATEGORIA.js").CATEGORIA } modelo
 */
export async function categoriaModifica(modelo) {
  validaNombre(modelo.CAT_NOMBRE);
  if (modelo.CAT_ID === undefined)
    throw new Error(`Falta CAT_ID de ${modelo.CAT_NOMBRE}.`);
  validaDescripcion(modelo.CAT_DESCRIPCION);
  validaEstado(modelo.CAT_ESTADO);
  validaId(modelo.CAT_ID);
  const anterior = await categoriaBusca(modelo.CAT_ID);
  if (anterior !== undefined) {
    modelo.CAT_MODIFICACION = Date.now();
    modelo.CAT_ELIMINADA = 0;
    return bdEjecuta(Bd, [ALMACEN_CATEGORIA], (transaccion) => {
      const almacenCategoria = transaccion.objectStore(ALMACEN_CATEGORIA);
      almacenCategoria.put(modelo);
    });
  }
}

exportaAHtml(categoriaModifica);
