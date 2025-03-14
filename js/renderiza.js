import { exportaAHtml } from "../lib/js/exportaAHtml.js";
import { htmlentities } from "../lib/js/htmlentities.js";

/**
 * @param {HTMLUListElement} lista
 * @param {import("./modelo/CATEGORIA.js").CATEGORIA[]} categorias
 */
export function renderiza(lista, categorias) {
  let render = "";
  for (const modelo of categorias) {
    if (modelo.CAT_ID === undefined)
      throw new Error(`Falta CAT_ID de ${modelo.CAT_NOMBRE}.`);
    const nombre = htmlentities(modelo.CAT_NOMBRE);
    const descripcion = htmlentities(modelo.CAT_DESCRIPCION);
    const estado = htmlentities(modelo.CAT_ESTADO);
    const searchParams = new URLSearchParams([["id", modelo.CAT_ID]]);
    const params = htmlentities(searchParams.toString());
    render +=
      /* html */
      `<li class="md-two-line">
        <p>
          <a href="modifica.html?${params}" style="text-decoration: none;">
            <span class="headline">${nombre}</span>
            <span class="supporting">Descripción: ${descripcion}</span>
            <span class="supporting">Estado: ${estado}</span>
          </a>
        </p>
      </li>`;
  }
  lista.innerHTML = render;
}

exportaAHtml(renderiza);
