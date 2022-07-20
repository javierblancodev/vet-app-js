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

// Eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);
}

// Objeto de cita
citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    sintomas: ''
}

// Registro de cita
function datosCita(e) {
    // Name the input in index.html first
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
}
