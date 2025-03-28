import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
   
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a new customer", async () => {
        const response = await request(app)
           .post("/clients")
           .send({ 
                name: "John Doe", 
                email: "aaa@gmail",
                address: {
                    street: "Rua dos Bobos",
                    number: 123,
                    state: "SP",
                    city: "São Paulo",
                    zipCode: "01234567"
                }
           });

        console.log("Response: ", response.body);
        

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.address.street).toBe("Rua dos Bobos");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.city).toBe("São Paulo");
        expect(response.body.address.zipCode).toBe("01234567");
    });


    // it("should not create a new customer", async () => {
    //     const response = await request(app)
    //        .post("/clients")
    //        .send({ 
    //             name: "John Doe", 
    //             address: {
    //                 street: "Rua dos Bobos",
    //                 number: 123,
    //                 state: "SP",
    //                 zip: "01234567"
    //             }
    //        });

    //     expect(response.status).toBe(500);
    // });

    // it("should list all customers", async () => {
    //     const response1 = await request(app)
    //     .post("/clients")
    //     .send({ 
    //          name: "John Doe", 
    //          email: "aaa@gmail",
    //          address: {
    //              street: "Rua dos Bobos",
    //              number: 123,
    //              state: "SP",
    //              city: "São Paulo",
    //              zipCode: "01234567"
    //          }
    //     });
    //     expect(response1.status).toBe(201);

    //     const response2 = await request(app)
    //     .post("/clients")
    //     .send({ 
    //          name: "Mary Jenkins", 
    //             email: "bbb@gmail",
    //          address: {
    //              street: "Rua Street",
    //              number: 111,
    //              state: "SP",
    //              city: "São Paulo",
    //              zipCode: "012223"
    //          }
    //     });
    //     expect(response2.status).toBe(201);

    //     const response = await request(app)
    //     .get("/clients")
    //     .send({});
        
    //     expect(response.status).toBe(200);
    //     expect(response.body.clients.length).toBe(2);
    //     expect(response.body.clients[0].name).toBe("John Doe");
    //     expect(response.body.clients[0].address.street).toBe("Rua dos Bobos");
    //     expect(response.body.clients[1].name).toBe("Mary Jenkins");
    //     expect(response.body.clients[1].address.street).toBe("Rua Street");

    // })


});