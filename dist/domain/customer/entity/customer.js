"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._active = false;
        this._rewardPoints = 0;
        this._id = id;
        this._name = name;
        this.validate();
    }
    get name() {
        return this._name;
    }
    get id() {
        return this._id;
    }
    get rewardPoints() {
        return this._rewardPoints;
    }
    get address() {
        return this._address;
    }
    validate() {
        if (this._name.length === 0) {
            throw new Error("Name cannot be empty");
        }
        if (this._id.length === 0) {
            throw new Error("ID cannot be empty");
        }
    }
    changeName(name) {
        this._name = name;
    }
    activate() {
        if (this._address === undefined) {
            throw new Error("Address must be set before activating the customer");
        }
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    changeAddress(address) {
        this._address = address;
    }
    isActive() {
        return this._active;
    }
    addRewardPoints(points) {
        this._rewardPoints += points;
    }
}
exports.default = Customer;
