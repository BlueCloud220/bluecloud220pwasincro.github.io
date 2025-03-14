import { enviaJson } from "../lib/js/enviaJson.js";
import { exportaAHtml } from "../lib/js/exportaAHtml.js";
import { muestraError } from "../lib/js/muestraError.js";
import { categoriaConsultaTodos } from "./bd/categoriaConsultaTodos.js";
import { categoriasReemplaza } from "./bd/categoriasReemplaza.js";
import { esperaUnPocoYSincroniza } from "./esperaUnPocoYSincroniza.js";
import { validaCategorias } from "./modelo/validaCategorias.js";
import { renderiza } from "./renderiza.js";

/**
 * @param {HTMLUListElement} lista
 */
export async function sincroniza(lista) {
  try {
    if (navigator.onLine) {
      const todos = await categoriaConsultaTodos();
      const respuesta = await enviaJson("srv/sincroniza.php", todos);
      const categorias = validaCategorias(respuesta.body);
      await categoriasReemplaza(categorias);
      renderiza(lista, categorias);
    }
  } catch (error) {
    muestraError(error);
  }
  esperaUnPocoYSincroniza(lista);
}

exportaAHtml(sincroniza);
