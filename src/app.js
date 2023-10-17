const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded());
//Create a GET method to create a new restaurant
app.post('/restaurants', async(req, res)=>{
    try{
    const rays = await Restaurant.create(req.body);
    res.json(rays);
    }
    catch(error){
        res.status(500).json({error: "Failed to create the item."})
    }
    
})

app.put('/restaurants/:id', async (req, res)=>{
    try{
        const newRestaurant = await Restaurant.update(req.body, 
        {
            where:{
                id: req.params.id
            } 
        }    )
        res.sendStatus(200);
    }
    catch(error){
        res.status(500).json({error: "Failed to update restuarant by ID."})
    }
})


app.delete('/restaurants/:id', async (req, res)=>{
    try{
        await Restaurant.destroy({
            where: {
                id: req.params.id
            }
        })
        res.sendStatus(200);
    }
    catch(error){
        res.status(500).json({error: "Failed to update restuarant by ID."})
    }
})



//Create a get request route that returns the resturant by id
app.get('/restaurants/:id', async(req, res)=>{
    try{
        const foodById = await Restaurant.findByPk(req.params.id)
        res.json(foodById);
    }
    catch(error){
        res.status(500).json({error: `An error occcured when fetching restaurants by id.`})
    }
})

//TODO: Create your GET Request Route Below: 

app.get('/restaurants', async (req, res)=>{
    try{
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    }
    catch(error){
        res.status(500).json({error:'An error occured when retriving restaurants'})
    }
})





module.exports = app;