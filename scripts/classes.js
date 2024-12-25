/* Programación orientada a objetos */

import { getFinalPrice } from './functions.js'

export class Doctor {
    constructor(id, name, specialty, yearsOfExperience, rate, discountPct) {
        this.id = id;
        this.name = name;
        this.specialty = specialty;
        this.yearsOfExperience = yearsOfExperience;
        this.rate = rate;
        this.discountPct = discountPct;
    }

    showInfo() {
        return `El doctor ${this.name} tiene por especialidad ${this.specialty}, y posee ${this.yearsOfExperience} años de experiencia`;
    }

    /* Cálculo de costo de consulta */

    getAppointmentCost(hasDiscount) {
        return getFinalPrice(this.rate, hasDiscount, this.discountPct);
    }

    static of(anotherObject) {
        return new Doctor(anotherObject.id, anotherObject.name, anotherObject.specialty, anotherObject.yearsOfExperience, 
            anotherObject.rate, anotherObject.discountPct);
    }
}

export class Cardiologo extends Doctor {
    constructor(id, name, yearsOfExperience, rate, discountPct) {
        super(id, name, "Cardiología", yearsOfExperience, rate, discountPct);
    }

    showInfo() {
        return `El cardiólogo ${this.name} posee ${this.yearsOfExperience} años de experiencia`;
    }
};