<div class="contenedor crear">
    
    <?php   include_once __DIR__ . '/../templates/nombre-sitio.php' ?>

    <div class="contenedor-sm">
        <p class="descripcion-pagina">Crea tu cuenta en UpTask</p>

        <form class="formulario" action="/crear" method="POST">

            <div class="campo">
                <label for="nombre">Nombre</label>
                <input type="nombre" id="nombre" placeholder="Tu Nombre" name="nombre">
            </div>
        
            <div class="campo">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Tu Email" name="email">
            </div>

            <div class="campo">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Tu Password" name="password">
            </div>

            <div class="campo">
                <label for="password2">Repetir Password</label>
                <input type="password2" id="password2" placeholder="Repite tu Password" name="password2">
            </div>

            <input type="submit" class="boton" value="Crear Cuenta">

        </form>

        <div class="acciones">
            <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
            <a href="/olvide">¿Olvidaste tu Password?</a>
        </div>

    </div>
</div>

