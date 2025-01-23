"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnviaConsoleLog2Handler {
    handle(event) {
        console.log('Esse é o segundo console.log do evento: CustomerCreated');
    }
}
exports.default = EnviaConsoleLog2Handler;
