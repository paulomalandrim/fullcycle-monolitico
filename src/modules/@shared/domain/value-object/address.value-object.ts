import BaseEntity from "../entity/base.entity";
import Id from "./id.value-object";
import ValueObject from "./value-object.interface";

export default class Address extends BaseEntity implements ValueObject {
    private _street: string;
    private _number: string;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(
        id: Id,
        street: string,
        number: string,
        complement: string,
        city: string,
        state: string,
        zipCode: string
    ){
        super(id);
        this._street = street;
        this._number = number;
        this._complement = complement;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;
    }

    get street() {
        return this._street;
    }

    get number() {
        return this._number;
    }

    get complement() {
        return this._complement;
    }

    get city() {
        return this._city;
    }

    get state() {
        return this._state;
    }

    get zipCode() {
        return this._zipCode;
    }

    set street(value: string) {
        this._street = value;
    }

    set number(value: string) {
        this._number = value;
    }

    set complement(value: string) {
        this._complement = value;
    }

    set city(value: string) {
        this._city = value;
    }

    set state(value: string) {
        this._state = value;
    }

    set zipCode(value: string) {
        this._zipCode = value;
    }

}