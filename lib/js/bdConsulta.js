/**
 * @template T
 * @param {Promise<IDBDatabase>} bd
 * @param {string[]} almacenes
 * @param {(transaccion: IDBTransaction, resolve: (resultado:T)=>void) => any
 *                                                                   } consulta
 * @returns {Promise<T>}
 */
export async function bdConsulta(bd, almacenes, consulta) {
  const base = await bd;

  return new Promise((resolve, reject) => {
    // Inicia una transacción de solo lectura.
    const transaccion = base.transaction(almacenes, "readonly");
    // Al terminar con error ejecuta la función reject.
    transaccion.onerror = () => reject(transaccion.error);
    // Estas son las operaciones para realizar la consulta.
    consulta(transaccion, resolve);
  });
}
