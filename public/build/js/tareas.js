!function(){!async function(){try{const a="/api/tareas?id="+n(),o=await fetch(a),r=await o.json();e=r.tareas,t()}catch(e){}}();let e=[];function t(){if(function(){const e=document.querySelector("#listado-tareas");for(;e.firstChild;)e.removeChild(e.firstChild)}(),0===e.length){const e=document.querySelector("#listado-tareas"),t=document.createElement("LI");return t.textContent="No Hay Tareas",t.classList.add("no-tareas"),void e.appendChild(t)}const c={0:"Pendiente",1:"Completa"};e.forEach(d=>{const i=document.createElement("LI");i.dataset.tareaId=d.id,i.classList.add("tarea");const s=document.createElement("P");s.textContent=d.nombre,s.onclick=function(){o(editar=!0,{...d})};const l=document.createElement("DIV");l.classList.add("opciones");const u=document.createElement("BUTTON");u.classList.add("estado-tarea"),u.classList.add(""+c[d.estado].toLowerCase()),u.textContent=c[d.estado],u.dataset.estadoTarea=d.estado,u.ondblclick=function(){console.log(d),function(e){const t="1"===e.estado?"0":"1";e.estado=t,a(e)}({...d})};const m=document.createElement("BUTTON");m.classList.add("eliminar-tarea"),m.dataset.idTarea=d.id,m.textContent="Eliminar",m.ondblclick=function(){!function(a){swal({title:"Estás Seguro?",text:"Una vez eliminada la tarea no podrás recuperarla",icon:"warning",buttons:!0,dangerMode:!0}).then(o=>{o&&(swal("La tarea ha sido eliminada!",{icon:"success"}),async function(a){const{estado:o,id:c,nombre:d}=a,i=new FormData;i.append("id",c),i.append("nombre",d),i.append("estado",o),i.append("proyectoId",n());try{const o="http://localhost:3000/api/tarea/eliminar",n=await fetch(o,{method:"POST",body:i}),c=await n.json();c.resultado&&r(c.mensaje,c.tipo,document.querySelector(".contenedor-nueva-tarea")),e=e.filter(e=>e.id!==a.id),t()}catch(e){}}(a))})}({...d})},l.appendChild(u),l.appendChild(m),i.appendChild(s),i.appendChild(l);document.querySelector("#listado-tareas").appendChild(i)})}async function a(a){const{estado:o,id:r,nombre:c,proyectoId:d}=a,i=new FormData;i.append("id",r),i.append("nombre",c),i.append("estado",o),i.append("proyectoId",n());try{const a="http://localhost:3000/api/tarea/actualizar",n=await fetch(a,{method:"POST",body:i});if("exito"===(await n.json()).respuesta.tipo){swal({icon:"success",title:"Tarea Actualizada Correctamente!"});const a=document.querySelector(".modal");a&&a.remove(),e=e.map(e=>(r===e.id&&(e.estado=o,e.nombre=c),e)),t()}}catch(e){}}function o(o=!1,c={}){const d=document.createElement("DIV");d.classList.add("modal"),d.innerHTML=`\n            <form class="formulario nueva-tarea">\n                <legend>${o?"Editar Tarea":"Agrega una nueva tarea"}</legend>\n                <div class="campo">\n                    <label>Tarea</label>\n                    <input type="text" \n                    name='tarea' \n                    placeholder='${!1===o?"Añadir tarea al proyecto actual":"Editar tarea"}'\n                    id='tarea'\n                    value= '${c.nombre?c.nombre:""}'\n                    />\n                </div>\n                <div class="opciones">\n                    <input type="submit" class="submit-nueva-tarea" value="${o?"Actualizar":"Añadir Tarea"}"></input>\n                    <button type="button" class="cerrar-modal">Cancelar</button>\n                </div>\n            </form>\n        `,setTimeout(()=>{document.querySelector(".formulario").classList.add("animar")},10);document.querySelector(".cerrar-modal");d.addEventListener("click",(function(i){if(i.preventDefault(),i.target.classList.contains("cerrar-modal")){document.querySelector(".formulario").classList.add("cerrar"),setTimeout(()=>{d.remove()},500)}if(i.target.classList.contains("submit-nueva-tarea")){const d=document.querySelector("#tarea").value.trim();if(""===d)return void r("El nombre de la tarea es obligatorio","error",document.querySelector(".formulario legend"));o?(c.nombre=d,a(c)):async function(a){const o=new FormData;o.append("nombre",a),o.append("proyectoId",n()),console.log(o);try{const n="http://localhost:3000/api/tarea",c=await fetch(n,{method:"POST",body:o}),d=await c.json();if(console.log(d),r(d.mensaje,d.tipo,document.querySelector(".formulario legend")),"exito"===d.tipo){const e=document.querySelector(".modal");setTimeout(()=>{e.remove()},2e3)}const i={id:String(d.id),nombre:a,estado:"0",proyectoId:d.proyectoId};e=[...e,i],t()}catch(e){}}(d)}})),document.querySelector(".dashboard").appendChild(d)}function n(){const e=new URLSearchParams(window.location.search);return Object.fromEntries(e.entries()).id}function r(e,t,a){const o=document.querySelector(".alerta");o&&o.remove();const n=document.createElement("DIV");n.classList.add("alerta",t),n.textContent=e,a.parentElement.insertBefore(n,a.nextElementSibling),setTimeout(()=>{n.remove()},3e3)}document.querySelector("#agregar-tarea").addEventListener("click",(function(){o()}))}();