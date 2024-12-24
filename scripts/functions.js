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

export const createAppointmentsGrid = (appointments) => {
    let table = document.createElement('table');
    table.setAttribute('class', 'table');
    let header = document.createElement('thead');
    header.setAttribute('class', 'thead-light');
    let headerTr = document.createElement('tr');
    ['ID', 'Paciente', 'Email', 'Especialidad', 'Hora'].forEach(columnTitle => {
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