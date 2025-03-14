<?php

require_once __DIR__ . "/../../lib/php/selectFirst.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_CATEGORIA.php";

/**
 * @return false | array{
 *   CAT_ID: string,
 *   CAT_NOMBRE: string,
 *   CAT_DESCRIPCION: string,
 *   CAT_ESTADO: string,
 *   CAT_MODIFICACION: int,
 *   CAT_ELIMINADA: int
 *  }
 */
function categoriaBusca(string $id): false|array
{
    return selectFirst(
        pdo: Bd::pdo(),
        from: CATEGORIA,
        where: [CAT_ID => $id]
    );
}
