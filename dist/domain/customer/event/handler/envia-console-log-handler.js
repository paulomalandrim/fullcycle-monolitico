"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnviaConsoleLogHandler {
    handle(event) {
        const id = event.eventData.id;
        const nome = event.eventData.name;
        const endereco = `${event.eventData.address.street}, numero: ${event.eventData.address.number}`;
        console.log(`Endereço do cliente: ${id}, ${nome} alterado para: ${endereco}`);
    }
}
exports.default = EnviaConsoleLogHandler;
