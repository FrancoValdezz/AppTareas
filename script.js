const inputTareas = document.getElementById('inputTareas')
const agregarTarea = document.getElementById('agregarTarea')
const containerTareas = document.getElementById('containerTareas')

/* Boton de check */
const buttoncheck = document.getElementsByClassName('fa-circle')
const containerRight = document.getElementById('containerRight');

console.log(buttoncheck)

let tareasPrincipales = []
let misTareas = []
/* Aal cargar la pagina se renderiza y se  */
renderizarTareas()

/* Mandar informacion del input con en el enetr */
inputTareas.addEventListener('keyup',(evento)=>{
    if(evento.key === 'Enter'){


        if(inputTareas.value.length > 0){
            misTareas.unshift({texto:inputTareas.value,check:false})
        }

        renderizarTareas()
        inputTareas.value = ''
    }

    
})

/* Este evento es para controlar el boton plus mas y agregarlo haciendo click
 */

agregarTarea.addEventListener('click',()=>{
    if(inputTareas.value.length > 0){
        misTareas.unshift({texto:inputTareas.value, check:false})
        renderizarTareas()
    
        inputTareas.value = ''
        
    }
    
})


function renderizarTareas (){
    if(misTareas.length > 0){
        containerTareas.innerHTML = ''

        misTareas.forEach((tarea,indice)=>{
            /* Creo el elemnto LI que es mi caja o box que contine las tareas */
            const boxTareas = document.createElement('li')
            boxTareas.className = 'box-tarea'

            /* Div que contiene al circulo y la tarea */
            const check = document.createElement('div')
            check.className = 'check'

            /* Creo el circulo */
            const circulo = document.createElement('i')
            circulo.className = tarea.check ? "fa-regular fa-circle fa-done" : "fa-regular fa-circle"

            /* creo la tarea */
            const textoTarea = document.createElement('p')
            textoTarea.textContent = `${tarea.texto}`
            
            /* Contenedor del lado derecho, contiene el boton de eliminar
            y el boton para que abra el modal de mas opciones */

            const eliminarAndOption = document.createElement('div')
            eliminarAndOption.className = 'eliminarAndOption'

            const moreOption = document.createElement('a')
            moreOption.className = 'moreOption'

            const grip = document.createElement('i')
            grip.className = 'fa-solid fa-grip-vertical'

            const borrarTarea = document.createElement('i')
    
            borrarTarea.className = 'fa-solid fa-x'


            /* Aca creo el modal de moreOption */
            const modalMoreOption = document.createElement('div')
            modalMoreOption.className = 'modalMoreOption'

            const ulModalOption = document.createElement('ul')
            ulModalOption.className = 'ulModal'

            const liModalOption1 = document.createElement('li')
            liModalOption1.textContent = 'Agregar a *COLOR*'
            

            const liModalOption2 = document.createElement('li')
            liModalOption2.textContent = 'Agregar a tareas secundarias'

            const liModalOption3 = document.createElement('li')
            liModalOption3.textContent = 'Crear un nuevo '

            


            /* Evento check al para saber cuando una tarea esta lista
            darle click y que cambie el color del  */
            circulo.addEventListener('click',()=>{
                console.log(misTareas[indice].texto)
                misTareas[indice].check = !misTareas[indice].check
                console.log(misTareas)
                /* misTareas[indice].check = !misTareas[indice].check */
                renderizarTareas()
            })
            /* Borrado del algun elemento */
            borrarTarea.addEventListener('click',()=>{
                const indice = misTareas.findIndex((t) => t.texto === tarea.texto);
                if (indice !== -1) {
                    misTareas.splice(indice, 1);
                    renderizarTareas();

                }
            })
            /* abrir y cerrar modal */
            let modalVisibilidad = false
            grip.addEventListener('click',(event)=>{
                console.log(misTareas[indice])
                modalVisibilidad = !modalVisibilidad
                if(modalVisibilidad)
                modalMoreOption.style.display = 'block'
                else{
                    modalMoreOption.style.display = 'none'
                
                }
                event.stopPropagation();
            }) 

            document.addEventListener('click', (event) => {
                // Verifica si el clic no ocurrió dentro del modalMoreOption y si el modal está abierto
                if (!modalMoreOption.contains(event.target) && modalVisibilidad) {
                    modalMoreOption.style.display = 'none';
                    modalVisibilidad = false;
                }
            }); 
            /* document.addEventListener('click', (event) => {
                const clickedElement = event.target;
                console.log('Hiciste clic en:', clickedElement);
            });  */
            
            liModalOption1.addEventListener('click',()=>{
    

                // Crea un nuevo elemento para la tarea
                const containerTareasPrincipales = document.createElement('div');
                containerTareasPrincipales.textContent = misTareas[indice].texto;

                // Agrega la nueva tarea al contenedor de tareas principales
                containerRight.appendChild(containerTareasPrincipales);

                // Agrega la tarea al array tareasPrincipales si no está presente
                
            });
                        
            


            ulModalOption.append(liModalOption1,liModalOption2,liModalOption3) 
            modalMoreOption.appendChild(ulModalOption) 

            moreOption.append(grip)
            /* CONTAINER QUE TIENE BORRAR Y EL GRIP */
            eliminarAndOption.append(borrarTarea,moreOption)
            /* CONTAINER QUE CONTIENE EL BOTON DE CHECK Y LA TAREA
            QUE ESCRIBISTE EN EL INPUT */
            check.append(circulo,textoTarea)
            /* CONTAINER DONDE ESTAN TODAS LAS FUNCIOANLIDADES */
            boxTareas.append(check,eliminarAndOption,modalMoreOption)
            /* CONTAINER PRINCIPAL */
            containerTareas.append(boxTareas)
        })
    }
    if (misTareas.length === 0){
        containerTareas.innerHTML = ''
        const textoVacio = document.createElement('p')
        textoVacio.textContent = 'No tienes tareas, agrega algunas'
        containerTareas.append(textoVacio)
    }
}

