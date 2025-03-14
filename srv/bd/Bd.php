<?php

class Bd
{
  private static ?PDO $pdo = null;

  static function pdo(): PDO
  {
    if (self::$pdo === null) {

      self::$pdo = new PDO(
        // cadena de conexión
        "mysql:host=sql103.infinityfree.com;dbname=if0_38520146_sincro",
        // usuario
        "if0_38520146",
        // contraseña
        "WBYH8Cz51FH",
        // Opciones: pdos no persistentes y lanza excepciones.
        [PDO::ATTR_PERSISTENT => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
      );

      self::$pdo->exec(
        "CREATE TABLE IF NOT EXISTS CATEGORIA (
          CAT_ID VARCHAR(500) NOT NULL,
          CAT_NOMBRE TEXT NOT NULL,
          CAT_DESCRIPCION TEXT NOT NULL,
          CAT_ESTADO TEXT NOT NULL,
          CAT_MODIFICACION INTEGER NOT NULL,
          CAT_ELIMINADA INTEGER NOT NULL,
          CONSTRAINT CAT_PK PRIMARY KEY (CAT_ID),
          CONSTRAINT CAT_ID_NV CHECK (CHAR_LENGTH(CAT_ID) > 0),
          CONSTRAINT CAT_NOM_NV CHECK (CHAR_LENGTH(CAT_NOMBRE) > 0),
          CONSTRAINT CAT_DES_NV CHECK (CHAR_LENGTH(CAT_DESCRIPCION) > 0),
          CONSTRAINT CAT_EST_NV CHECK (CHAR_LENGTH(CAT_ESTADO) > 0)
        ) ENGINE=InnoDB"
      );
    }

    return self::$pdo;
  }
}
