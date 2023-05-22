<?php include_once __DIR__ . '/header-dashboard.php'; ?>

<div class="contenedor-sm">
    <?php include_once __DIR__ . '/../templates/alertas.php' ;?>

    <a href="/perfil" class="enlace">Volver a Perfil</a>

    <form class="formulario" method="POST" action="/cambiar-password">

        <div class="campo">
            <label for="password_actual">Password Actual</label>
            <input type="password" name="passwod_actual" placeholder="Tu password actual">
        </div>

        <div class="campo">
            <label for="password_nuevo">Nuevo Password</label>
            <input type="password" name="passwod_nuevo" placeholder="Tu nuevo password">
        </div>

        <input type="submit" value="Guardar Cambios">

    </form>
</div>

<?php include_once __DIR__ . '/footer-dashboard.php'; ?>