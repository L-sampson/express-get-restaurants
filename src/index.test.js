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
})

