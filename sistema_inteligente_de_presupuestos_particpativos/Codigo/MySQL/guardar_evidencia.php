<?php
require "conexion.php";

$usuario_id = $_POST['usuario_id'];
$presupuesto_id = $_POST['presupuesto_id'];
$titulo = $_POST['titulo'];
$descripcion = $_POST['descripcion'];

$sql = "INSERT INTO evidencias (usuario_id, presupuesto_id, titulo, descripcion)
        VALUES (?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("iiss", $usuario_id, $presupuesto_id, $titulo, $descripcion);
$stmt->execute();

$evidencia_id = $stmt->insert_id;

/* ---- SUBIDA DE ARCHIVOS ----- */

$carpeta = "../uploads/evidencias/";
if (!file_exists($carpeta)) {
    mkdir($carpeta, 0777, true);
}

foreach ($_FILES['archivos']['tmp_name'] as $i => $tmp) {
    $nombre = $_FILES['archivos']['name'][$i];
    $tipo_mime = $_FILES['archivos']['type'][$i];

    if (str_contains($tipo_mime, "image")) {
        $tipo = "imagen";
    } elseif (str_contains($tipo_mime, "pdf")) {
        $tipo = "pdf";
    } else {
        $tipo = "otro";
    }

    $ruta = $carpeta . time() . "_" . $nombre;
    move_uploaded_file($tmp, $ruta);

    $sql2 = "INSERT INTO evidencias_archivos (evidencia_id, tipo, ruta_archivo, nombre_original)
            VALUES (?, ?, ?, ?)";

    $stmt2 = $conexion->prepare($sql2);
    $stmt2->bind_param("isss", $evidencia_id, $tipo, $ruta, $nombre);
    $stmt2->execute();
}

echo json_encode(["status" => "ok"]);
?>
