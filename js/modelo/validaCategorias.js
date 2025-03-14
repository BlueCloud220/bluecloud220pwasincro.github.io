import { validaCategoria } from "./validaCategoria.js";

/**
 * @param { any } objetos
 * @returns {import("./CATEGORIA.js").CATEGORIA[]}
 */
export function validaCategorias(objetos) {
  if (!Array.isArray(objetos)) throw new Error("no se recibió un arreglo.");
  /**
   * @type {import("./CATEGORIA.js").CATEGORIA[]}
   */
  const arreglo = [];
  for (const objeto of objetos) {
    arreglo.push(validaCategoria(objeto));
  }
  return arreglo;
}
