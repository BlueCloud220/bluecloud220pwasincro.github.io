import { bdConsulta } from "../../lib/js/bdConsulta.js";
import { validaCategoria } from "../modelo/validaCategoria.js";
import { ALMACEN_CATEGORIA, Bd } from "./Bd.js";

/**
 * Lista todos los objetos, incluyendo los que tienen borrado lógico.
 */
export async function categoriaConsultaTodos() {
  return bdConsulta(
    Bd,
    [ALMACEN_CATEGORIA],
    /**
     * @param {(resultado: import("../modelo/CATEGORIA.js").CATEGORIA[])=>void
     *                                                                  } resolve
     */
    (transaccion, resolve) => {
      const resultado = [];

      // Pide un cursor para recorrer cada objeto que devuelve la consulta.
      const consulta = transaccion.objectStore(ALMACEN_CATEGORIA).openCursor();

      /* onsuccess se invoca por cada uno de los objetos de la consulta y una vez
       * cuando se acaban dichos objetos. */
      consulta.onsuccess = () => {
        /* El cursor correspondiente al objeto se recupera usando
         *  consulta.result */
        const cursor = consulta.result;
        if (cursor === null) {
          /* Si el cursor vale null, ya no hay más objetos que procesar; por lo
           * mismo, se devuelve el resultado con los categorias recuperados, usando
           *  resolve(resultado). */
          resolve(resultado);
        } else {
          /* Si el cursor no vale null y hay más objetos, el siguiente se obtiene con
           *  cursor.value*/
          resultado.push(validaCategoria(cursor.value));
          /* Busca el siguiente objeto de la consulta, que se recupera la siguiente
           * vez que se invoque la función onsuccess. */
          cursor.continue();
        }
      };
    }
  );
}
