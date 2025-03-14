import { consumeJson } from "./consumeJson.js";

/**
 * Envía los datos de la forma a la url usando la codificación
 * multipart/form-data.
 * @param {string} url
 * @param {Event} event
 * @param { "GET" | "POST"| "PUT" | "PATCH" | "DELETE" | "TRACE" | "OPTIONS"
 *  | "CONNECT" | "HEAD" } metodoHttp
 */
export function submitForm(url, event, metodoHttp = "POST") {
  // Evitar que el formulario se envíe de manera predeterminada:
  event.preventDefault();

  const form = event.target;

  // Valida que el elemento que disparó event.target sea un formulario HTML
  if (!(form instanceof HTMLFormElement))
    throw new Error("event.target no es un elemento de tipo form.");

  return consumeJson(
    // fetch hace solicitud a srv/procesa.php y recupera resultado JSON
    fetch(url, {
      method: metodoHttp,
      // Se indica que el cliente espera recibir una respuesta en formato JSON
      headers: { Accept: "application/json, application/problem+json" },
      // Se crea una instancia de FormData que contiene todos los campos del formulario
      body: new FormData(form),
    })
  );
}

// Permite que los eventos de html usen la función.
window["submitForm"] = submitForm;
