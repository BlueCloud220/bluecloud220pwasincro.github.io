import { bdConsulta } from "../../lib/js/bdConsulta.js";
import { exportaAHtml } from "../../lib/js/exportaAHtml.js";
import { validaCategoria } from "../modelo/validaCategoria.js";
import { ALMACEN_CATEGORIA, Bd } from "./Bd.js";

/**
 * @param {string} id
 */
export async function categoriaBusca(id) {
  return bdConsulta(
    Bd,
    [ALMACEN_CATEGORIA],
    /**
     * @param {(resultado: import("../modelo/CATEGORIA.js").CATEGORIA|undefined)
     *                                                            => any} resolve
     */
    (transaccion, resolve) => {
      /* Pide el primer objeto de ALMACEN_CATEGORIA que tenga como llave
       * primaria el valor del parámetro id. */
      const consulta = transaccion.objectStore(ALMACEN_CATEGORIA).get(id);

      // onsuccess se invoca solo una vez, devolviendo el objeto solicitado.
      consulta.onsuccess = () => {
        /* Se recupera el objeto solicitado usando
         *  consulta.result
         * Si el objeto no se encuentra se recupera undefined. */
        const objeto = consulta.result;
        if (objeto !== undefined) {
          const modelo = validaCategoria(objeto);
          if (modelo.CAT_ELIMINADA === 0) {
            resolve(modelo);
            return;
          }
        }
        resolve(undefined);
      };
    }
  );
}

exportaAHtml(categoriaBusca);
