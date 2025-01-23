"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const send_email_when_product_is_created_handler_1 = __importDefault(require("../../product/event/handle/send-email-when-product-is-created.handler"));
const event_dispatcher_1 = __importDefault(require("./event-dispatcher"));
const product_created_event_1 = __importDefault(require("../../product/event/product-created.event"));
describe("Domain events testes", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new send_email_when_product_is_created_handler_1.default();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });
    it("should unregister an event handler", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new send_email_when_product_is_created_handler_1.default();
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
        const eventHandler = new send_email_when_product_is_created_handler_1.default();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(2);
        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined;
    });
    it("should notify all event handlers", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new send_email_when_product_is_created_handler_1.default();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        const productCreatedEvent = new product_created_event_1.default({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        });
        eventDispatcher.notify(productCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });
});
