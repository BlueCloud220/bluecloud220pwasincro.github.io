<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaJson.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/../lib/php/ProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveErrorInterno.php";
require_once __DIR__ . "/modelo/TABLA_CATEGORIA.php";
require_once __DIR__ . "/modelo/validaCategoria.php";
require_once __DIR__ . "/bd/categoriaAgrega.php";
require_once __DIR__ . "/bd/categoriaBusca.php";
require_once __DIR__ . "/bd/categoriaConsultaNoEliminados.php";
require_once __DIR__ . "/bd/categoriaModifica.php";

ejecutaServicio(function () {

    $lista = recuperaJson();

    if (!is_array($lista)) {
        $lista = [];
    }

    foreach ($lista as $modelo) {
        $modeloEnElCliente = validaCategoria($modelo);
        $modeloEnElServidor = categoriaBusca($modeloEnElCliente[CAT_ID]);

        if ($modeloEnElServidor === false) {

            /* CONFLICTO: El modelo no ha estado en el servidor.
            * AGREGARLO solamente si no está eliminado. */
            if ($modeloEnElCliente[CAT_ELIMINADA] === 0) {
                categoriaAgrega($modeloEnElCliente);
            }
        } elseif (
            $modeloEnElServidor[CAT_ELIMINADA] === 0
            && $modeloEnElCliente[CAT_ELIMINADA] === 1
        ) {

            /* CONFLICTO: El registro está en el servidor, donde no se ha eliminado, pero
            * ha sido eliminado en el cliente.
            * Gana el cliente, porque optamos por no revivir lo eliminado. */
            categoriaModifica($modeloEnElCliente);
        } else if (
            $modeloEnElCliente[CAT_ELIMINADA] === 0
            && $modeloEnElServidor[CAT_ELIMINADA] === 0
        ) {

            /* CONFLICTO: Registros en el servidor y en el cliente. Pueden ser
            * diferentes.
            * GANA FECHA MÁS GRANDE. Cuando gana el servidor, no se hace nada. */
            if (
                $modeloEnElCliente[CAT_MODIFICACION] >
                $modeloEnElServidor[CAT_MODIFICACION]
            ) {
                // La versión del cliente es más nueva y prevalece.
                categoriaModifica($modeloEnElCliente);
            }
        }
    }

    $lista = categoriaConsultaNoEliminados();

    devuelveJson($lista);
});
