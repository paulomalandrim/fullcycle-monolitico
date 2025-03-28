import express from 'express';
import ClientAdmFacadeFactory from '../../client-adm/factory/facade.factory';
import Address from '../../@shared/domain/value-object/address.value-object';
import Id from '../../@shared/domain/value-object/id.value-object';

export const clientRoute = express.Router();

clientRoute.post('/', async (req, res) => {
    // Implementar a criação de um novo cliente
    const clientFacade = ClientAdmFacadeFactory.create();
    try {
        const clientDto = {
            name: req.body.name,
            email: req.body.email,
            address: new Address(
                new Id(),
                req.body.address.street,
                req.body.address.number,
                req.body.address.complement,
                req.body.address.city,
                req.body.address.state,
                req.body.address.zipCode,
            )

        }

        console.log("Tentativa de gravar na base...");
        
        const output = await clientFacade.add(clientDto);

        const response = {
            id: output.id,
            name: output.name,
            email: output.email,
            address: {
                street: output.address.street,
                number: output.address.number,
                complement: output.address.complement,
                city: output.address.city,
                state: output.address.state,
                zipCode: output.address.zipCode,
            },
        };

        res.format({
            json: async () => res.status(201).send(response),
        });

    } catch (err) {
        res.status(500).send(err);
    }
});

clientRoute.get('/', async (req, res) => {
    // Implementar a listagem de clientes
    const clientFacade = ClientAdmFacadeFactory.create();

    const output = await clientFacade.find(req.body.id);
    
    res.format({
        json: async () => res.send(output),
    });
});