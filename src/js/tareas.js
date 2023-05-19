//const { default: swal } = require("sweetalert");


(function(){
    
    obtenerTareas();

    let tareas = [];
    //Boton para mostrar el modal de agregar tarea

    const nuevaTareaBtn = document.querySelector('#agregar-tarea');

    nuevaTareaBtn.addEventListener('click', function() {
        mostrarFormulario();
    });

    async function obtenerTareas() {
        try {
            const id = obtenerProyecto();
            const url = `/api/tareas?id=${id}`
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            tareas = resultado.tareas;

            mostrarTareas();
            
            
        } catch (error) {
            
        }
    }

    function mostrarTareas() {

        limpiarTareas();

        if(tareas.length === 0 ) {
            const contenedorTareas = document.querySelector('#listado-tareas');

            const textoNoTareas = document.createElement('LI');

            textoNoTareas.textContent = 'No Hay Tareas';
            textoNoTareas.classList.add('no-tareas');
            
            contenedorTareas.appendChild(textoNoTareas);

            return;

        }

        const estados = {
            0: 'Pendiente',
            1: 'Completa'
        }

        tareas.forEach(tarea => {
            const contenedorTarea = document.createElement('LI');
            contenedorTarea.dataset.tareaId = tarea.id;

            contenedorTarea.classList.add('tarea');

            const nombreTarea = document.createElement('P');
            nombreTarea.textContent = tarea.nombre;
            nombreTarea.onclick = function() {
                mostrarFormulario(editar = true, {...tarea});
            }

            const opcionesDiv = document.createElement('DIV');
            opcionesDiv.classList.add('opciones');

            //Botones

            const btnEstadoTarea = document.createElement('BUTTON');
            btnEstadoTarea.classList.add('estado-tarea');
            btnEstadoTarea.classList.add(`${estados[tarea.estado].toLowerCase()}`);
            btnEstadoTarea.textContent = estados[tarea.estado];
            btnEstadoTarea.dataset.estadoTarea = tarea.estado;
            btnEstadoTarea.ondblclick = function() {
                console.log(tarea);
                cambiarEstadoTarea({...tarea});
            }


            const btnEliminarTarea = document.createElement('BUTTON');
            btnEliminarTarea.classList.add('eliminar-tarea');
            btnEliminarTarea.dataset.idTarea = tarea.id;
            btnEliminarTarea.textContent = 'Eliminar';
            btnEliminarTarea.ondblclick = function() {
                confirmarEliminarTarea({...tarea});
            };

            opcionesDiv.appendChild(btnEstadoTarea);
            opcionesDiv.appendChild(btnEliminarTarea);

            contenedorTarea.appendChild(nombreTarea);
            contenedorTarea.appendChild(opcionesDiv);

            const listadoTareas = document.querySelector('#listado-tareas');

            listadoTareas.appendChild(contenedorTarea);

        });
    }

    function confirmarEliminarTarea(tarea) {
        const respuesta = swal({
            title: "Estás Seguro?",
            text: "Una vez eliminada la tarea no podrás recuperarla",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("La tarea ha sido eliminada!", {
                icon: "success",
              });
              eliminarTarea(tarea);
            } 
          });

    }

    async function eliminarTarea(tarea) {
        
        const {estado, id, nombre} = tarea;

        const datos = new FormData();

        datos.append('id', id);
        datos.append('nombre', nombre);
        datos.append('estado', estado);
        datos.append('proyectoId', obtenerProyecto());

        try {
            const url = 'http://localhost:3000/api/tarea/eliminar';

            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });

            const resultado = await respuesta.json();

            if(resultado.resultado) {
                mostrarAlerta(resultado.mensaje, 
                    resultado.tipo, 
                    document.querySelector('.contenedor-nueva-tarea'));
            };

            tareas = tareas.filter(tareaMemoria => tareaMemoria.id !== tarea.id);
            mostrarTareas();

        } catch (error) {
            
        }
    }

    function cambiarEstadoTarea(tarea) {
        const nuevoEstado = tarea.estado === "1" ? "0" : "1";
        tarea.estado = nuevoEstado;
        actualizarTarea(tarea);
    }

    async function actualizarTarea(tarea) {
        const {estado, id, nombre, proyectoId} = tarea;

        const datos = new FormData();

        datos.append('id', id);
        datos.append('nombre', nombre);
        datos.append('estado', estado);
        datos.append('proyectoId', obtenerProyecto());
        
        try {
            const url = 'http://localhost:3000/api/tarea/actualizar';

            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            })

            const resultado = await respuesta.json();

            if(resultado.respuesta.tipo === 'exito') {
                swal({
                    icon: "success",
                    title: "Tarea Actualizada Correctamente!",
                  });

                
                const modal = document.querySelector('.modal');

                if(modal) {
                    modal.remove();
                };
                

                tareas = tareas.map(tareaMemoria => {
                    if(id === tareaMemoria.id) {
                        tareaMemoria.estado = estado;
                        tareaMemoria.nombre = nombre;
                    };

                    return tareaMemoria;
                });

                mostrarTareas();
            }


        } catch (error) {
            
        }

        // for(let valor of datos.values()) {
        //     console.log(valor);
        // }

    }
    
    function mostrarFormulario(editar = false, tarea = {}) {
        const modal = document.createElement('DIV')
        //console.log(modal);
        modal.classList.add('modal');
        //console.log(modal);
        modal.innerHTML = `
            <form class="formulario nueva-tarea">
                <legend>${editar ? 'Editar Tarea' : 'Agrega una nueva tarea'}</legend>
                <div class="campo">
                    <label>Tarea</label>
                    <input type="text" 
                    name='tarea' 
                    placeholder='${editar===false ? 'Añadir tarea al proyecto actual' : 'Editar tarea'}'
                    id='tarea'
                    value= '${tarea.nombre ? tarea.nombre : ''}'
                    />
                </div>
                <div class="opciones">
                    <input type="submit" class="submit-nueva-tarea" value="${editar ? 'Actualizar' : 'Añadir Tarea'}"></input>
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
                const nombreTarea = document.querySelector('#tarea').value.trim();
                if(nombreTarea === '') {
                    //Mostrar una alerta de error
                    mostrarAlerta('El nombre de la tarea es obligatorio', 'error', document.querySelector('.formulario legend'));

                    return; //elreturn
                }
                if(editar) {
                    tarea.nombre = nombreTarea;
                    actualizarTarea(tarea);
                } else {
                    agregarTarea(nombreTarea);
                };
            };

            
        });

        document.querySelector('.dashboard').appendChild(modal);
    }


    //Consultar el Servidor para añadir una nueva tarea al proyecto actual

    async function agregarTarea(tarea) {
        //Construir la petición

        const datos = new FormData();
        datos.append('nombre', tarea);
        datos.append('proyectoId', obtenerProyecto());
        console.log(datos);
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

            if(resultado.tipo === 'exito') {
                const modal = document.querySelector('.modal');
                setTimeout(() => {
                    modal.remove();
                    //window.location.reload();
                }, 2000);
            }

            //Agregar el objeto tarea al global de tareas
            const tareaObj = {
                id: String(resultado.id),
                nombre: tarea,
                estado: "0",
                proyectoId: resultado.proyectoId
            }

            tareas = [...tareas, tareaObj];

            mostrarTareas();

            //console.log(tareaObj);

        } catch (error) {
            
        };
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


    function limpiarTareas() {
        const listadoTareas = document.querySelector('#listado-tareas');

        while(listadoTareas.firstChild) {
            listadoTareas.removeChild(listadoTareas.firstChild);
        }
    }

})();