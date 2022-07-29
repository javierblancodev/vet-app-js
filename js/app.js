// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector("#nueva-cita");
const contendorCitas = document.querySelector('#citas');

// Clases
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita]
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
        ui.imprimirAlerta('La cita ha sido eliminada correctamente');
        ui.imprimirCitas(this);
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        // Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agrega estilos en funcion del tipo de alerta
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else if(tipo === 'success') {
            divMensaje.classList.add('success');
        }

        // Agrega contenido
        divMensaje.textContent = mensaje;

        // Inserta el div en el DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Elimina el div despues de 5 seg
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    imprimirCitas({citas}) {

        this.limpiarHTML();

        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            // Crea el contenedor para la cita
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono: </span> ${telefono}`

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`

            // Agrega boton para eliminar cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';

            btnEliminar.onclick = () => administrarCitas.eliminarCita(id);

            // Agrega elementos al contenedor de la cita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);

            // Inserta el contenedor de la cita en el DOM
            contendorCitas.appendChild(divCita);
        });

    }

    limpiarHTML() {
        while(contendorCitas.children.length > 0) {
                contendorCitas.removeChild(contendorCitas.firstChild);
            }
    }
}

const administrarCitas = new Citas();
const ui = new UI()

// Eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

// Objeto de cita
citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Registro de cita
function datosCita(e) {
    // Name the input in index.html first
    citaObj[e.target.name] = e.target.value;
}

// Validacion y adicion de una nueva cita
function nuevaCita(e) {
    e.preventDefault();
    
    // Extraccion de las propiedades de citaObj
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validacion de campos
    if( [mascota, propietario, telefono, fecha, hora, sintomas].includes('') ) {
        ui.imprimirAlerta('All fields must be filled', 'error');
        
        return;
    }

    // Generacion de id unico
    citaObj.id = Date.now();
    
    // Adicion de nueva cita
    administrarCitas.agregarCita({...citaObj}); // Pasamos una copia, no el objeto global. De lo contrario, se modificarian los datos en el listado cada vez que modificamos el objeto global

    // Reinicio del formulario
    reiniciarObjeto();
    formulario.reset();

    // Mostrar citas en HTML
    ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}