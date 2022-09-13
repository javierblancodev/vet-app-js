class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita]
        ui.imprimirAlerta('La cita se ha guardado correctamente');
    }

    editarCita(citaActualizada) {
        ui.imprimirAlerta('Cambios guardados correctamente');
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita );
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
        ui.imprimirAlerta('La cita ha sido eliminada correctamente');
        ui.imprimirCitas(this);
    }

    cargarEdicion(cita) {
        const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

        // Llena los inputs
        mascotaInput.value = mascota;
        propietarioInput.value = propietario;
        telefonoInput.value = telefono;
        fechaInput.value = fecha;
        fechaInput.value = fecha;
        horaInput.value = hora;
        sintomasInput.value = sintomas;

        // Llena el objeto de cita

        citaObj.mascota = mascota;
        citaObj.propietario = propietario;
        citaObj.telefono = telefono;
        citaObj.fecha = fecha;
        citaObj.hora = hora;
        citaObj.sintomas = sintomas;
        citaObj.id = id;
        
        // Cambiar apariencia de boton
        formulario.querySelector('button[type="submit"]').textContent = "Guardar Cambios"

        editando = true;
    }
}

export default Citas;