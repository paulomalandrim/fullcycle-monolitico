"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerCreatedEvent {
    constructor(eventData) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}
exports.default = CustomerCreatedEvent;
