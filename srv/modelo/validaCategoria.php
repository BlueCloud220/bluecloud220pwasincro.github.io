<?php

require_once __DIR__ . "/../../lib/php/BAD_REQUEST.php";
require_once __DIR__ . "/../../lib/php/validaJson.php";
require_once __DIR__ . "/../../lib/php/ProblemDetails.php";
require_once __DIR__ . "/TABLA_CATEGORIA.php";

function validaCategoria($objeto)
{

    $objeto = validaJson($objeto);

    if (!isset($objeto->CAT_ID) || !is_string($objeto->CAT_ID))
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "El id debe ser texto.",
            type: "/error/idincorrecto.html",
        );

    if (!isset($objeto->CAT_NOMBRE) || !is_string($objeto->CAT_NOMBRE))
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "El nombre debe ser texto.",
            type: "/error/nombreincorrecto.html",
        );

    if (!isset($objeto->CAT_DESCRIPCION) || !is_string($objeto->CAT_DESCRIPCION))
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "La descripción debe ser texto.",
            type: "/error/descripcionincorrecta.html",
        );

    if (!isset($objeto->CAT_ESTADO) || !is_string($objeto->CAT_ESTADO))
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "El estado debe ser texto.",
            type: "/error/estadoincorrecto.html",
        );

    if (!isset($objeto->CAT_MODIFICACION)  || !is_int($objeto->CAT_MODIFICACION))
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "La modificacion debe ser número.",
            type: "/error/modificacionincorrecta.html",
        );

    if (!isset($objeto->CAT_ELIMINADA) || !is_int($objeto->CAT_ELIMINADA))
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "El campo eliminado debe ser entero.",
            type: "/error/eliminadoincorrecto.html",
        );

    return [
        CAT_ID => $objeto->CAT_ID,
        CAT_NOMBRE => $objeto->CAT_NOMBRE,
        CAT_DESCRIPCION => $objeto->CAT_DESCRIPCION,
        CAT_ESTADO => $objeto->CAT_ESTADO,
        CAT_MODIFICACION => $objeto->CAT_MODIFICACION,
        CAT_ELIMINADA => $objeto->CAT_ELIMINADA
    ];
}
