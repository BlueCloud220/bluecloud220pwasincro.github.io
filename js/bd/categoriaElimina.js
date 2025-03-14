import { bdEjecuta } from "../../lib/js/bdEjecuta.js";
import { exportaAHtml } from "../../lib/js/exportaAHtml.js";
import { ALMACEN_CATEGORIA, Bd } from "./Bd.js";
import { categoriaBusca } from "./categoriaBusca.js";

/**
 * @param { string } id
 */
export async function categoriaElimina(id) {
  const modelo = await categoriaBusca(id);
  if (modelo !== undefined) {
    modelo.CAT_MODIFICACION = Date.now();
    modelo.CAT_ELIMINADA = 1;
    return bdEjecuta(Bd, [ALMACEN_CATEGORIA], (transaccion) => {
      const almacenCategoria = transaccion.objectStore(ALMACEN_CATEGORIA);
      almacenCategoria.put(modelo);
    });
  }
}

exportaAHtml(categoriaElimina);
