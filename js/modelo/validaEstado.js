/**
 * @param {string} estado
 */
export function validaEstado(estado) {
  if (estado === "") throw new Error("Falta el estado.");
}
