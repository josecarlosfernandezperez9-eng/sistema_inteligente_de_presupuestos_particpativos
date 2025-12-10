<?php
require "conexion.php";

$curp = $_POST['curp'];
$nombre = $_POST['nombre'];
$primer_apellido = $_POST['primer_apellido'];
$segundo_apellido = $_POST['segundo_apellido'];
$sexo = $_POST['sexo'];
$fecha_nacimiento = $_POST['fecha_nacimiento'];

$telefono = $_POST['telefono'];
$correo = $_POST['correo'];

$pais = $_POST['pais'];
$cp = $_POST['codigo_postal'];
$estado = $_POST['estado'];
$municipio = $_POST['municipio'];
$colonia = $_POST['colonia'];
$calle = $_POST['calle'];
$numero = $_POST['numero'];

$sql = "INSERT INTO usuarios (
    curp, nombre, primer_apellido, segundo_apellido, sexo, fecha_nacimiento,
    telefono, correo, pais, codigo_postal, estado, municipio, colonia, calle, numero
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);

$stmt->bind_param("sssssss sssss ss",
    $curp, $nombre, $primer_apellido, $segundo_apellido, $sexo, $fecha_nacimiento,
    $telefono, $correo, $pais, $cp, $estado, $municipio, $colonia, $calle, $numero
);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "usuario_id" => $stmt->insert_id]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
