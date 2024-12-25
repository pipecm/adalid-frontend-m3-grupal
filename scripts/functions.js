import { Doctor } from './classes.js'

export const getServiceItem = (serviceItem) => {
    let service = document.createElement('div');
    service.setAttribute('class', 'service');

    let serviceImage = document.createElement('img');
    serviceImage.setAttribute('class', 'service__img');
    serviceImage.setAttribute('src', serviceItem.imageSource);
    serviceImage.setAttribute('alt', serviceItem.name);
    serviceImage.setAttribute('title', serviceItem.name);

    let serviceTitle = document.createElement('p');
    serviceTitle.setAttribute('class', 'service__department');
    serviceTitle.innerHTML = serviceItem.name;

    let serviceCaption = document.createElement('p');
    serviceCaption.innerHTML = serviceItem.description;

    service.appendChild(serviceImage);
    service.appendChild(serviceTitle);
    service.appendChild(serviceCaption);

    return service;
};

export const getDoctorItem = (doctorItem) => {
    let doctor = document.createElement('div');
    doctor.setAttribute('class', 'doctor');

    let doctorImage = document.createElement('img');
    doctorImage.setAttribute('class', 'doctor__photo');
    doctorImage.setAttribute('src', doctorItem.imageSource);
    doctorImage.setAttribute('alt', doctorItem.name);
    doctorImage.setAttribute('title', doctorItem.name);

    let doctorTitle = document.createElement('p');
    doctorTitle.setAttribute('class', 'doctor__name');
    doctorTitle.innerHTML = doctorItem.name;

    let doctorSpecialty = document.createElement('p');
    doctorSpecialty.setAttribute('class', 'doctor__specialty');
    doctorSpecialty.innerHTML = doctorItem.specialty;

    let doctorExperience = document.createElement('p');
    doctorExperience.setAttribute('class', 'doctor__experience');
    doctorExperience.innerHTML = doctorItem.experience;

    doctor.appendChild(doctorImage);
    doctor.appendChild(doctorTitle);
    doctor.appendChild(doctorSpecialty);
    doctor.appendChild(doctorExperience);

    return doctor;
};

/* Algoritmo de búsqueda basado en búsqueda binaria */

export const findDoctorByName = (doctorsList, nameToFind) => {
    let startIndex = 0;
    let endIndex = doctorsList.length - 1;

    while (startIndex <= endIndex) {
        let middle = Math.floor((startIndex + endIndex) / 2);
        if (doctorsList[middle].name == nameToFind) return middle;
        if (doctorsList[middle] < nameToFind) startIndex = middle + 1;
        else endIndex = middle - 1;
    }

    return -1;
};

/* Algoritmo de ordenamiento basado en el algoritmo InsertionSort */

export const sortDoctorsByYearsOfExperience = (doctorsList) => {
    for (let i = 1; i < doctorsList.length; i++) {
        let current = doctorsList[i];
        let lastIndex = i - 1;

        while (lastIndex >= 0 && doctorsList[lastIndex].yearsOfExperience > current.yearsOfExperience) {
            doctorsList[lastIndex + 1] = doctorsList[lastIndex];
            lastIndex--;
        }
        doctorsList[lastIndex + 1] = current;
    }

    return doctorsList;
};

/* Función que crea la grilla de citas médicas */

export const createAppointmentsGrid = (appointments) => {
    let table = document.createElement('table');
    table.setAttribute('class', 'table');
    let header = document.createElement('thead');
    header.setAttribute('class', 'thead-light');
    let headerTr = document.createElement('tr');
    ['ID', 'Paciente', 'Email', 'Especialidad', 'Fecha'].forEach(columnTitle => {
        let headerTh = document.createElement('th');
        headerTh.setAttribute('scope', 'col');
        headerTh.innerHTML = columnTitle;
        headerTr.appendChild(headerTh);
    });
    header.appendChild(headerTr);
    table.appendChild(header);

    let body = document.createElement('tbody');
    appointments.forEach(appt => {
        let bodyTr = document.createElement('tr');
        let hasScope = false;
        [appt.id, appt.name, appt.email, appt.specialty, appt.date].forEach(columnData => {
            let bodyTd = document.createElement('td');
            if (!hasScope) {
                bodyTd.setAttribute('scope', 'row');
                hasScope = true;
            }
            bodyTd.innerHTML = columnData;
            bodyTr.appendChild(bodyTd);
        });
        body.appendChild(bodyTr);
    });
    table.appendChild(body);

    return table;
};

/* Programación funcional: Composición de funciones */

export const getFinalPrice = (rate, hasDiscount, discountPct) => {
    const priceWithVAT = (rate) => rate * 1.19;
    const priceWithDiscount = (rate, discountPct) => rate * (1 - (discountPct/100)); 

    return hasDiscount ? priceWithVAT(priceWithDiscount(rate, discountPct)) : priceWithVAT(rate);
};

/* Uso de programación asíncrona utilizando async/await y promesas para la simulación de un registro de citas. */

export const getPastAppointments = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let response = fetch('data/appointments.json');
            if (response) {
                resolve(response);
            } else {
                reject("Error al obtener la información");
            }
        }, 3000);
    });
};

/* Función que crea la grilla de deudas de pacientes */

export const createDebtsGrid = (appointments, doctors) => {
    let table = document.createElement('table');
    table.setAttribute('class', 'table');
    let header = document.createElement('thead');
    header.setAttribute('class', 'thead-light');
    let headerTr = document.createElement('tr');
    ['Paciente', 'Deuda (CLP)'].forEach(columnTitle => {
        let headerTh = document.createElement('th');
        headerTh.setAttribute('scope', 'col');
        headerTh.innerHTML = columnTitle;
        headerTr.appendChild(headerTh);
    });
    header.appendChild(headerTr);
    table.appendChild(header);

    let patients = Array.from(new Set(appointments.map(appt => appt.name)));
    let costPerPatient = patients.map(patient => {
        let patientAppts = appointments.filter(appt => appt.name == patient);
        let hasDiscount = patientAppts.length >= 3;
        let cost = patientAppts.reduce((total, appt) => {
            let whatDoctorAttended = Doctor.of(doctors.filter(dr => dr.id === appt.doctorId)[0]);
            return total + whatDoctorAttended.getAppointmentCost(hasDiscount);
        }, 0);
        return { patient: patient, totalCost: cost };
    });

    let body = document.createElement('tbody');
    costPerPatient.forEach(patient => {
        let bodyTr = document.createElement('tr');
        [patient.patient, patient.totalCost].forEach(columnData => {
            let bodyTd = document.createElement('td');
            bodyTd.innerHTML = columnData;
            bodyTr.appendChild(bodyTd);
        });
        body.appendChild(bodyTr);
    });
    table.appendChild(body);

    return table;
};