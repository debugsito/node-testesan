const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const item = require("./model/item");
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("conectado a mongodb")
}).catch((error)=>{
    console.log("error al conectarse a mongodb", error);
})

app.get("/api/esan",(req,res)=>{
    //res.sendStatus(204);    
    res.json("Hola")
});

app.get("/api/items", async (req,res)=>{
    try{
        const items = await item.find();
        res.json(items);
    }catch(error){
        res.status(500).json({
            error,
            message:"pipipi"
        })
    }
});

app.get("/api/items/random", async (req, res) => {
    try {
        // Generar un nombre y cantidad aleatorios
        const randomName = `Item-${Math.floor(Math.random() * 1000)}`;  // Nombre aleatorio
        const randomQuantity = Math.floor(Math.random() * 100) + 1;  // Cantidad entre 1 y 100

        // Crear un nuevo item con estos valores aleatorios
        const newItem = new item({
            name: randomName,
            quantity: randomQuantity,
        });

        // Guardar el item en la base de datos
        const savedItem = await newItem.save();

        // Devolver el item creado
        res.status(201).json({
            message: "Item generado aleatoriamente y creado con éxito",
            item: savedItem,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el item aleatorio",
            error,
        });
    }
});




app.listen(port, () => {
    console.log("Servidor ejecutándose en: http://localhost:" + port)
});