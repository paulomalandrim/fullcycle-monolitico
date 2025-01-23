"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductCreatedEvent {
    constructor(eventData) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}
exports.default = ProductCreatedEvent;
