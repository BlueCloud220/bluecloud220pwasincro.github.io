export const ALMACEN_CATEGORIA = "CATEGORIA";
export const CAT_ID = "CAT_ID";
export const INDICE_NOMBRE = "INDICE_NOMBRE";
export const CAT_NOMBRE = "CAT_NOMBRE";
const BD_NOMBRE = "sincronizacion";
const BD_VERSION = 1;

/** @type { Promise<IDBDatabase> } */
export const Bd = new Promise((resolve, reject) => {
  /* Se solicita abrir la base de datos, indicando nombre y
   * número de versión. */
  const solicitud = indexedDB.open(BD_NOMBRE, BD_VERSION);

  // Si se presenta un error, rechaza la promesa.
  solicitud.onerror = () => reject(solicitud.error);

  // Si se abre con éxito, devuelve una conexión a la base de datos.
  solicitud.onsuccess = () => resolve(solicitud.result);

  // Si es necesario, se inicia una transacción para cambio de versión.
  solicitud.onupgradeneeded = () => {
    const bd = solicitud.result;

    // Como hay cambio de versión, borra el almacén si es que existe.
    if (bd.objectStoreNames.contains(ALMACEN_CATEGORIA)) {
      bd.deleteObjectStore(ALMACEN_CATEGORIA);
    }

    // Crea el almacén "CATEGORIA" con el campo llave "CAT_ID".
    const almacenCategoria = bd.createObjectStore(ALMACEN_CATEGORIA, {
      keyPath: CAT_ID,
    });

    // Crea un índice ordenado por el campo "CAT_NOMBRE" que no acepta duplicados.
    almacenCategoria.createIndex(INDICE_NOMBRE, "CAT_NOMBRE");
  };
});
