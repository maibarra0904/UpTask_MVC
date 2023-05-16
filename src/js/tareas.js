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

        document.querySelector('body').appendChild(modal);
    }
})();