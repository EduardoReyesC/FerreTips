<?php
include("conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = password_hash(trim($_POST['password']), PASSWORD_DEFAULT);

    if ($nombre && $email && $password) {
        try {
            $stmt = $conex->prepare("INSERT INTO usuarios(nombre, email, password) VALUES (?, ?, ?)");
            $stmt->execute([$nombre, $email, $password]);
            echo "<p class='success'>¡Registro exitoso!</p>";
        } catch (PDOException $e) {
            echo "<p class='error'>Error: " . $e->getMessage() . "</p>";
        }
    } else {
        echo "<p class='error'>Todos los campos son obligatorios.</p>";
    }
}
?>
