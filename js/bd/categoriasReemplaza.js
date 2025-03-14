import { bdEjecuta } from "../../lib/js/bdEjecuta.js";
import { ALMACEN_CATEGORIA, Bd } from "./Bd.js";

/**
 * Borra el contenido del almacén CATEGORIA y guarda nuevoscategorias.
 * @param {import("../modelo/CATEGORIA.js").CATEGORIA[]} nuevoscategorias
 */
export async function categoriasReemplaza(nuevoscategorias) {
  return bdEjecuta(Bd, [ALMACEN_CATEGORIA], (transaccion) => {
    const almacenCategoria = transaccion.objectStore(ALMACEN_CATEGORIA);
    almacenCategoria.clear();
    for (const objeto of nuevoscategorias) {
      almacenCategoria.add(objeto);
    }
  });
}
