const request = require("supertest");
const app = require("./app");
const Restaurant = require("../models/index")
const db = require("../db/connection");
const syncSeed = require("../seed")
let restNumber;

beforeAll(async ()=>{
    await syncSeed();
    const restaurants = await Restaurant.findAll({});
    restNumber = restaurants.length;
})

describe("Test GET/restaurants methods", ()=>{
    it("Returns the correct status and array of restaurants", async ()=>{
        const response = await request(app)
        .get('/restaurants')
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0].cuisine).toContain("FastFood")
    })

    it("Returns correct number of restaurants and correct index", async ()=>{
        const response = await request(app)
        .get('/restaurants')
        expect(response.body.length).toEqual(restNumber);
        expect(response.body).toContainEqual(
            expect.objectContaining({
                id: 1,
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood"
            })
        )
    })

    it("Returns correct number of restaurants and correct index", async ()=>{
        const response = await request(app)
        .get('/restaurants/1')
        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood"
            })
        )
    })
})


describe("POST methods", ()=>{
    it("return larger array with new value", async ()=>{
        const response = await request(app)
        .post('/restaurants')
        .send({name: "Rays on the River", location: "Atlanta", cuisine: "Seafood"})
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toEqual(restNumber + 1);
    })
})

describe("PUT methods",  ()=>{
    it("update", async ()=>{
    const response = await request(app)
    .put("/restaurants/1")
    .send({name: "Bobby", location: "Atlanta", cuisine: "american"})
    const restaurant = await Restaurant.findByPk(1);
    expect(restaurant.name).toEqual("Bobby")
    })  
})

describe("Delete methods", ()=>{
    it("delete by id", async ()=>{
        await request(app).delete("/restaurants/1");
        const restaruants = await Restaurant.findAll({});
        expect(restaruants.length).toEqual(restNumber)
        expect(restaruants[0].id).not.toEqual(1);
    })
})

