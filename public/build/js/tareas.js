!function(){!async function(){try{const t="/api/tareas?id="+d(),a=await fetch(t),n=await a.json();e=n.tareas,o()}catch(e){}}();let e=[],t=[];const a=document.querySelector("#agregar-tarea");function n(a){const n=a.target.value;t=""!==n?e.filter(e=>e.estado===n):[],o()}function o(){!function(){const e=document.querySelector("#listado-tareas");for(;e.firstChild;)e.removeChild(e.firstChild)}(),function(){const t=e.filter(e=>"0"===e.estado),a=e.filter(e=>"1"===e.estado),n=document.querySelector("#pendientes"),o=document.querySelector("#completadas");0===t.length?n.disabled=!0:n.disabled=!1;0===a.length?o.disabled=!0:o.disabled=!1}();const a=t.length?t:e;if(0===a.length){const e=document.querySelector("#listado-tareas"),t=document.createElement("LI");return t.textContent="No Hay Tareas",t.classList.add("no-tareas"),void e.appendChild(t)}const n={0:"Pendiente",1:"Completa"};a.forEach(t=>{const a=document.createElement("LI");a.dataset.tareaId=t.id,a.classList.add("tarea");const s=document.createElement("P");s.textContent=t.nombre,s.onclick=function(){c(editar=!0,{...t})};const l=document.createElement("DIV");l.classList.add("opciones");const u=document.createElement("BUTTON");u.classList.add("estado-tarea"),u.classList.add(""+n[t.estado].toLowerCase()),u.textContent=n[t.estado],u.dataset.estadoTarea=t.estado,u.ondblclick=function(){console.log(t),function(e){const t="1"===e.estado?"0":"1";e.estado=t,r(e)}({...t})};const m=document.createElement("BUTTON");m.classList.add("eliminar-tarea"),m.dataset.idTarea=t.id,m.textContent="Eliminar",m.ondblclick=function(){!function(t){swal({title:"Estás Seguro?",text:"Una vez eliminada la tarea no podrás recuperarla",icon:"warning",buttons:!0,dangerMode:!0}).then(a=>{a&&(swal("La tarea ha sido eliminada!",{icon:"success"}),async function(t){const{estado:a,id:n,nombre:r}=t,c=new FormData;c.append("id",n),c.append("nombre",r),c.append("estado",a),c.append("proyectoId",d());try{const a="http://localhost:3000/api/tarea/eliminar",n=await fetch(a,{method:"POST",body:c}),r=await n.json();r.resultado&&i(r.mensaje,r.tipo,document.querySelector(".contenedor-nueva-tarea")),e=e.filter(e=>e.id!==t.id),o()}catch(e){}}(t))})}({...t})},l.appendChild(u),l.appendChild(m),a.appendChild(s),a.appendChild(l);document.querySelector("#listado-tareas").appendChild(a)})}async function r(t){const{estado:a,id:n,nombre:r,proyectoId:c}=t,i=new FormData;i.append("id",n),i.append("nombre",r),i.append("estado",a),i.append("proyectoId",d());try{const t="http://localhost:3000/api/tarea/actualizar",c=await fetch(t,{method:"POST",body:i});if("exito"===(await c.json()).respuesta.tipo){swal({icon:"success",title:"Tarea Actualizada Correctamente!"});const t=document.querySelector(".modal");t&&t.remove(),e=e.map(e=>(n===e.id&&(e.estado=a,e.nombre=r),e)),o()}}catch(e){}}function c(t=!1,a={}){const n=document.createElement("DIV");n.classList.add("modal"),n.innerHTML=`\n            <form class="formulario nueva-tarea">\n                <legend>${t?"Editar Tarea":"Agrega una nueva tarea"}</legend>\n                <div class="campo">\n                    <label>Tarea</label>\n                    <input type="text" \n                    name='tarea' \n                    placeholder='${!1===t?"Añadir tarea al proyecto actual":"Editar tarea"}'\n                    id='tarea'\n                    value= '${a.nombre?a.nombre:""}'\n                    />\n                </div>\n                <div class="opciones">\n                    <input type="submit" class="submit-nueva-tarea" value="${t?"Actualizar":"Añadir Tarea"}"></input>\n                    <button type="button" class="cerrar-modal">Cancelar</button>\n                </div>\n            </form>\n        `,setTimeout(()=>{document.querySelector(".formulario").classList.add("animar")},10);document.querySelector(".cerrar-modal");n.addEventListener("click",(function(c){if(c.preventDefault(),c.target.classList.contains("cerrar-modal")){document.querySelector(".formulario").classList.add("cerrar"),setTimeout(()=>{n.remove()},500)}if(c.target.classList.contains("submit-nueva-tarea")){const n=document.querySelector("#tarea").value.trim();if(""===n)return void i("El nombre de la tarea es obligatorio","error",document.querySelector(".formulario legend"));t?(a.nombre=n,r(a)):async function(t){const a=new FormData;a.append("nombre",t),a.append("proyectoId",d()),console.log(a);try{const n="http://localhost:3000/api/tarea",r=await fetch(n,{method:"POST",body:a}),c=await r.json();if(console.log(c),i(c.mensaje,c.tipo,document.querySelector(".formulario legend")),"exito"===c.tipo){const e=document.querySelector(".modal");setTimeout(()=>{e.remove()},2e3)}const d={id:String(c.id),nombre:t,estado:"0",proyectoId:c.proyectoId};e=[...e,d],o()}catch(e){}}(n)}})),document.querySelector(".dashboard").appendChild(n)}function d(){const e=new URLSearchParams(window.location.search);return Object.fromEntries(e.entries()).id}function i(e,t,a){const n=document.querySelector(".alerta");n&&n.remove();const o=document.createElement("DIV");o.classList.add("alerta",t),o.textContent=e,a.parentElement.insertBefore(o,a.nextElementSibling),setTimeout(()=>{o.remove()},3e3)}document.querySelectorAll('#filtros input[type="radio"]').forEach(e=>{e.addEventListener("input",n)}),a.addEventListener("click",(function(){c()}))}();