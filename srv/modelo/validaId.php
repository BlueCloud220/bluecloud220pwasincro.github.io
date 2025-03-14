<?php

function validaId(string $id)
{
  if ($id === "")
    throw new ProblemDetails(
      status: BAD_REQUEST,
      title: "Falta el id.",
      type: "/error/faltaid.html",
    );
}
