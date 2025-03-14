<?php

require_once __DIR__ . "/../../lib/php/select.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_CATEGORIA.php";

/**
 * @return array{
 *   CAT_ID: string,
 *   CAT_NOMBRE: string,
 *   CAT_DESCRIPCION: string,
 *   CAT_ESTADO: string,
 *   CAT_MODIFICACION: int,
 *   CAT_ELIMINADA: int
 *  }[]
 */
function categoriaConsultaNoEliminados()
{
    return select(
        pdo: Bd::pdo(),
        from: CATEGORIA,
        where: [CAT_ELIMINADA => 0],
        orderBy: CAT_NOMBRE
    );
}
