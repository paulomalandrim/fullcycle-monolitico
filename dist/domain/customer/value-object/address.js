"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(street, number, city, state, zip) {
        this._street = street;
        this._number = number;
        this._city = city;
        this._state = state;
        this._zip = zip;
        this.validate();
    }
    get street() {
        return this._street;
    }
    get number() {
        return this._number;
    }
    get city() {
        return this._city;
    }
    get state() {
        return this._state;
    }
    get zip() {
        return this._zip;
    }
    validate() {
        if (this._state.length === 0) {
            throw new Error("State is required");
        }
        if (this._zip.length === 0) {
            throw new Error("Zip is required");
        }
        if (this._city.length === 0) {
            throw new Error("City is required");
        }
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }
        if (isNaN(this._number)) {
            throw new Error("Number must be a number");
        }
    }
}
exports.default = Address;
