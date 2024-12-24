import { getDoctorItem, findDoctorByName, sortDoctorsByYearsOfExperience, createAppointmentsGrid } from './functions.js'
import { Queue } from './structures.js'

let appointments = localStorage.getItem('appointments') ? new Queue(JSON.parse(localStorage.getItem('appointments'))) : new Queue([]);

/* Simula la obtención de datos desde una API REST y carga dinámicamente la información en la interfaz */

let staffGrid = document.getElementById("staff-grid");
let doctorsList = await fetch('data/doctors.json').then(response => response.json());

if (staffGrid) {
    console.log(doctorsList);                            
    doctorsList.forEach(doctorItem => staffGrid.appendChild(getDoctorItem(doctorItem)));
}

/* Realiza operaciones de clonación, fusión (merge), y recorrido de los datos JSON */

let drJohnJackson = { ...doctorsList[0], isSurgeon: false, availableOnWeekends: true};
let drJackJohnson = JSON.parse(JSON.stringify(drJohnJackson));
drJackJohnson.name = 'Jack Johnson'
console.log("Objeto clonado:");
console.log(drJackJohnson);
console.log("Objeto original:");
console.log(drJohnJackson);
doctorsList.forEach(dr => console.log(`Aquí está el doctor ${dr.name}`));

/* Implementa algoritmos de búsqueda y ordenamiento para gestionar los datos de los doctores. */

/* Búsqueda de doctores en arreglo (ordenado alfabéticamente por nombre del doctor) */

['Jack Johnson', 'John Jackson']
    .map(name => ({ doctor: name, found: findDoctorByName(doctorsList, name) }))
    .map(result => result.found >= 0 ? `Doctor ${result.doctor} encontrado` : `Doctor ${result.doctor} no encontrado`)
    .map(message => console.log(message));

/* Ordenamiento de doctores por años de experiencia */

let orderedDoctors = sortDoctorsByYearsOfExperience(doctorsList).map(dr => ({ doctor: dr.name, yearsOfExperience: dr.yearsOfExperience }));
console.log('Doctores desde el menos hasta el más experimentado:');
console.log(orderedDoctors);

/* Gestión de citas de pacientes */

let appointmentForm = document.getElementById('appointment_form');
appointmentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let newAppointment = {
        id: appointments.size() + 1,
        name: document.getElementById('form_name').value,
        email: document.getElementById('form_email').value,
        specialty: document.getElementById('form_specialty').value,
        detail: document.getElementById('form_detail').value,
        date: new Date()
    };
    appointments.enqueue(newAppointment);
    alert('Cita agendada con éxito!');
});

let appointmentsGrid = document.getElementById('appointments_grid');
if (appointmentsGrid) {
    appointmentsGrid.appendChild(createAppointmentsGrid(appointments.getData()));

    let attendNextPatient = document.getElementById('attend_next_patient');
    attendNextPatient.addEventListener('click', () => {
        let attendingTo = appointments.dequeue();
        let nowAttending = document.getElementById('now_attending');
        nowAttending.innerHTML = `Actualmente atendiendo al paciente ${attendingTo.name} en la unidad de ${attendingTo.specialty}`
    })
}