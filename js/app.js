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
    console.log(citaObj);
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
}