import Citas from "./classes/citas.js";
import UI from "./classes/UI.js";
import { formulario } from './selectores.js'

export const administrarCitas = new Citas();
export const ui = new UI();

export let edicionObj = {edicion: false};



// Objeto de cita
export let citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Registro de cita
export function datosCita(e) {
    // Name the input in index.html first
    citaObj[e.target.name] = e.target.value;
}

// Validacion y adicion de una nueva cita
export function nuevaCita(e) {
    e.preventDefault();
    
    // Extraccion de las propiedades de citaObj
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validacion de campos
    if( [mascota, propietario, telefono, fecha, hora, sintomas].includes('') ) {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        
        return;
    }

    if(edicionObj.edicion) {
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita '
        edicionObj.edicion = false;
        administrarCitas.editarCita({ ...citaObj })
    } else {
        // Generacion de id unico
        citaObj.id = Date.now();

        // Adicion de nueva cita
        administrarCitas.agregarCita({...citaObj}); // Pasamos una copia, no el objeto global. De lo contrario, se modificarian los datos en el listado cada vez que modificamos el objeto global

    }

    // Reinicio del formulario
    reiniciarObjeto();
    formulario.reset();

    // Mostrar citas en HTML
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}
