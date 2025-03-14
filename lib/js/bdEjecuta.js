/**
 * @param {Promise<IDBDatabase>} bd
 * @param {string[]} entidades
 * @param {(t:IDBTransaction) => void} operaciones
 */
export async function bdEjecuta(bd, entidades, operaciones) {
  // Espera que se abra la bd
  const base = await bd;

  return new Promise((resolve, reject) => {
    // Inicia una transacción de lectura y escritura.
    const transaccion = base.transaction(entidades, "readwrite");
    // Al terminar con éxito, ejecuta la función resolve.
    transaccion.oncomplete = resolve;
    // Al terminar con error, ejecuta la función reject.
    transaccion.onerror = () => reject(transaccion.error);
    // Estas son las operaciones de la transacción.
    operaciones(transaccion);
  });
}
