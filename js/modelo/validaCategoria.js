/**
 * @param { any } objeto
 * @returns {import("./CATEGORIA.js").CATEGORIA}
 */
export function validaCategoria(objeto) {
  if (typeof objeto.CAT_ID !== "string")
    throw new Error("El id debe ser texto.");

  if (typeof objeto.CAT_NOMBRE !== "string")
    throw new Error("El nombre debe ser texto.");

  if (typeof objeto.CAT_DESCRIPCION !== "string")
    throw new Error("La descripción debe ser texto.");

  if (typeof objeto.CAT_ESTADO !== "string")
    throw new Error("El estado debe ser texto.");

  if (typeof objeto.CAT_MODIFICACION !== "number")
    throw new Error("El campo modificacion debe ser número.");

  if (typeof objeto.CAT_ELIMINADA !== "number")
    throw new Error("El campo eliminado debe ser número.");

  return objeto;
}
