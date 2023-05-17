(function(){

    //Boton para mostrar el modal de agregar tarea

    const nuevaTareaBtn = document.querySelector('#agregar-tarea');

    nuevaTareaBtn.addEventListener('click', mostrarFormulario);

    function mostrarFormulario() {
        const modal = document.createElement('DIV')
        //console.log(modal);
        modal.classList.add('modal');
        //console.log(modal);
        modal.innerHTML = `
            <form class="formulario nueva-tarea">
                <legend>Añade una nueva tarea </legend>
                <div class="campo">
                    <label>Tarea</label>
                    <input type="text" name='tarea' placeholder='Añadir tarea al proyecto actual' id='tarea'/>
                </div>
                <div class="opciones">
                    <input type="submit" class="submit-nueva-tarea" value="Añadir Tarea"></input>
                    <button type="button" class="cerrar-modal">Cancelar</button>
                </div>
            </form>
        `;

        setTimeout(() => {
            const formulario = document.querySelector('.formulario');
            formulario.classList.add('animar');
        }, 10);

        const btnCerrrarModal = document.querySelector('.cerrar-modal');

        modal.addEventListener('click', function(e) {
            e.preventDefault();
            if(e.target.classList.contains('cerrar-modal')) {
                const formulario = document.querySelector('.formulario');
                formulario.classList.add('cerrar');
                setTimeout(() => {
                    modal.remove();
                }, 500);
            }

            if(e.target.classList.contains('submit-nueva-tarea')) {
                submitFormularioNuevaTarea();
            };
        });

        document.querySelector('.dashboard').appendChild(modal);
    }

    function submitFormularioNuevaTarea() {
        const tarea = document.querySelector('#tarea').value.trim();
        if(tarea === '') {
            //Mostrar una alerta de error
            mostrarAlerta('El nombre de la tarea es obligatorio', 'error', document.querySelector('.formulario legend'));

            return; //elreturn
        }

        agregarTarea(tarea);

    }

    //Consultar el Servidor para añadir una nueva tarea al proyecto actual

    async function agregarTarea(tarea) {
        //Construir la petición

        const datos = new FormData();
        datos.append('nombre', tarea);
        datos.append('proyectoId', obtenerProyecto());

        //return;

        try {
            const url = 'http://localhost:3000/api/tarea';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });

            const resultado = await respuesta.json();

            console.log(resultado);

            mostrarAlerta(resultado.mensaje, resultado.tipo, document.querySelector('.formulario legend'));

        } catch (error) {
            
        }
    }

    function obtenerProyecto() {
        const proyectoParams = new URLSearchParams(window.location.search);

        const proyecto = Object.fromEntries(proyectoParams.entries());

        return proyecto.id;
    }

    //Muestra mensaje de alerta en la interfaz
    function mostrarAlerta(mensaje, tipo, referencia) {

        //Previene la creación de varias alertas
        const alertaPrevia = document.querySelector('.alerta');

        if(alertaPrevia) alertaPrevia.remove();

        const alerta = document.createElement('DIV');
        alerta.classList.add('alerta', tipo);
        alerta.textContent = mensaje;

        //Inserta alerta antes del legend
        referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);

        //Eliminar la alerta después de un tiempo

        setTimeout(() => {
            alerta.remove();
        }, 3000);

    }


})();