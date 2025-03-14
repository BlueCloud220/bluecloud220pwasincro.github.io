<?php

require_once __DIR__ . "/devuelveResultadoNoJson.php";

function devuelveJson($resultado)
{
    // Convierte el resultado en un string JSON
    $json = json_encode($resultado);

    // Si la conversión a JSON falla
    if ($json === false) {
        // Llama a una función alternativa que maneja la respuesta cuando no es posible devolver JSON
        devuelveResultadoNoJson();
    } else {
        // Si la conversión es exitosa, se configura el código de respuesta HTTP 200
        http_response_code(200);

        // Se especifica el tipo de contenido de la respuesta como JSON
        header("Content-Type: application/json");

        // Se imprime el JSON como respuesta
        echo $json;
    }
}
