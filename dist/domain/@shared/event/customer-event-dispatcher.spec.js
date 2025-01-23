"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_changed_event_1 = __importDefault(require("../../customer/event/address-changed.event"));
const customer_created_event_1 = __importDefault(require("../../customer/event/customer-created.event"));
const envia_console_log_handler_1 = __importDefault(require("../../customer/event/handler/envia-console-log-handler"));
const envia_console_log1_handler_1 = __importDefault(require("../../customer/event/handler/envia-console-log1-handler"));
const envia_console_log2_handler_1 = __importDefault(require("../../customer/event/handler/envia-console-log2-handler"));
const event_dispatcher_1 = __importDefault(require("./event-dispatcher"));
describe("Customer Domain events testes", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler1 = new envia_console_log1_handler_1.default();
        const eventHandler2 = new envia_console_log2_handler_1.default();
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
    });
    it("should unregister an event handler", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new envia_console_log1_handler_1.default();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(2);
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    });
    it("should unregister all events handler", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new envia_console_log1_handler_1.default();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(2);
        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined;
    });
    it("should notify all event handlers", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler1 = new envia_console_log1_handler_1.default();
        const eventHandler2 = new envia_console_log2_handler_1.default();
        const eventHandler = new envia_console_log_handler_1.default();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.register("AddressChangedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
            .toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1])
            .toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"][0])
            .toMatchObject(eventHandler);
        const customerCreatedEvent = new customer_created_event_1.default({
            id: "123",
            name: "Customer 1",
        });
        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
        const addressChanedEvent = new address_changed_event_1.default({
            id: "345",
            name: "Cliente 2",
            address: {
                street: "Rua 1",
                number: "987",
            },
        });
        eventDispatcher.notify(addressChanedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });
});
