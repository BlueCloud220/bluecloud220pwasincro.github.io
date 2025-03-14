<?php

require_once __DIR__ . "/../../lib/php/validaNombre.php";
require_once __DIR__ . "/../../lib/php/validaDescripcion.php";
require_once __DIR__ . "/../../lib/php/validaEstado.php";
require_once __DIR__ . "/../../lib/php/insert.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_CATEGORIA.php";
require_once __DIR__ . "/../modelo/validaId.php";

/**
 * @param array{
 *   CAT_ID: string,
 *   CAT_NOMBRE: string,
 *   CAT_DESCRIPCION: string,
 *   CAT_ESTADO: string,
 *   CAT_MODIFICACION: int,
 *   CAT_ELIMINADA: int
 *  } $modelo
 */
function categoriaAgrega(array $modelo)
{
    validaId($modelo[CAT_ID]);
    validaNombre($modelo[CAT_NOMBRE]);
    validaDescripcion($modelo[CAT_DESCRIPCION]);
    validaEstado($modelo[CAT_ESTADO]);
    insert(pdo: Bd::pdo(), into: CATEGORIA, values: $modelo);
}
