import { Doctor, Cardiologo } from './classes.js';
import { getServiceItem, getDoctorItem, findDoctorByName, sortDoctorsByYearsOfExperience, 
    createAppointmentsGrid, getPastAppointments, createDebtsGrid } from './functions.js'
import { Queue } from './structures.js'

let appointments = localStorage.getItem('appointments') ? new Queue(JSON.parse(localStorage.getItem('appointments'))) : new Queue([]);

/* Simula la obtención de datos de servicios desde una API REST y carga dinámicamente la información en la interfaz */

let servicesGrid = document.getElementById("services-grid");
let servicesList = await fetch('data/services.json').then(response => response.json());

if (servicesGrid) {
    console.log(servicesGrid);                            
    servicesList.forEach(serviceItem => servicesGrid.appendChild(getServiceItem(serviceItem)));
}

/* Simula la obtención de datos de doctores desde una API REST y carga dinámicamente la información en la interfaz */

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
/* Implementación de event listener */

let appointmentForm = document.getElementById('appointment_form');
if (appointmentForm) {
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
}


let appointmentsGrid = document.getElementById('appointments_grid');
if (appointmentsGrid) {
    appointmentsGrid.appendChild(createAppointmentsGrid(appointments.getData()));

    /* Implementación de event listener */

    let attendNextPatient = document.getElementById('attend_next_patient');
    attendNextPatient.addEventListener('click', () => {
        let attendingTo = appointments.dequeue();
        let nowAttending = document.getElementById('now_attending');
        nowAttending.innerHTML = `Actualmente atendiendo al paciente ${attendingTo.name} en la unidad de ${attendingTo.specialty}`
    })
}

/* Uso de programación asíncrona utilizando async/await y promesas para la simulación de un registro de citas. */

let pastAppts = await getPastAppointments().then(response => response.json());
console.log(`Se encontraron ${pastAppts.length} citas agendadas`);
console.log(pastAppts);

let pastApptsGrid = document.getElementById('past_appointments_grid');
if (pastApptsGrid) {
    let pastApptsTitle = document.createElement('h4');
    pastApptsTitle.innerHTML = 'Atenciones anteriores';
    pastApptsGrid.appendChild(pastApptsTitle);
    pastApptsGrid.appendChild(createAppointmentsGrid(pastAppts));
}

let debtsGrid = document.getElementById('debts_grid');
if (debtsGrid) {
    let debtsTitle = document.createElement('h4');
    debtsTitle.innerHTML = 'Deudas de pacientes';
    debtsGrid.appendChild(debtsTitle);

    let debtsGridDoctors = doctorsList.map(dr => {
        if (dr.specialty == 'Cardiología') {
            return new Cardiologo(dr.id, dr.name, dr.yearsOfExperience, dr.rate.cost, dr.discount.percentage);
        } 
        return new Doctor(dr.id, dr.name, dr.specialty, dr.yearsOfExperience, dr.rate.cost, dr.discount.percentage);
    });

    debtsGridDoctors.forEach(dr => console.log(dr.showInfo()));
    debtsGrid.appendChild(createDebtsGrid(pastAppts, debtsGridDoctors));
}