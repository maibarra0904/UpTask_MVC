<div class="contenedor olvide">
    
    <?php   include_once __DIR__ . '/../templates/nombre-sitio.php' ?>

    <div class="contenedor-sm">
        <p class="descripcion-pagina">Recupera tu cuenta en UpTask</p>

        <?php   include_once __DIR__ . '/../templates/alertas.php' ?>

        <form class="formulario" action="/olvide" method="POST" novalidate>
        
            <div class="campo">
                <label for="email">Ingresa tu Email</label>
                <input type="email" id="email" placeholder="Tu Email" name="email">
            </div>


            <input type="submit" class="boton" value="Recuperar Cuenta">

        </form>

        <div class="acciones">
            <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
            <a href="/crear">¿Aún no tienes una cuenta? Obtener Una</a>
        </div>

    </div>
</div>