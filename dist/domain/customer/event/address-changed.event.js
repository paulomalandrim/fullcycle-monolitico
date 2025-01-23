"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddressChangedEvent {
    constructor(eventData) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}
exports.default = AddressChangedEvent;
