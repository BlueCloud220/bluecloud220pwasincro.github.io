import { exportaAHtml } from "../lib/js/exportaAHtml.js";
import { sincroniza } from "./sincroniza.js";

/**
 * Cada 10 segundos (1000 milisegundos) después de la última
 * sincronización, los datos se envían al servidor para volver a
 * sincronizarse con los datos del servidor.
 */
const MILISEGUNDOS_PARA_VOLVER_A_SINCRONIZAR = 10000;

/**
 * @param {HTMLUListElement} lista
 */
export function esperaUnPocoYSincroniza(lista) {
  setTimeout(() => sincroniza(lista), MILISEGUNDOS_PARA_VOLVER_A_SINCRONIZAR);
}

exportaAHtml(esperaUnPocoYSincroniza);
