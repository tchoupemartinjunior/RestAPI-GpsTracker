require("dotenv").config();
const express = require('express');
const app = express();
// cette route fait reference a celle créé dans le router.js
const userRouter = require("./api/users/user.router");
const vehicleRouter = require("./api/vehicules/position.router");

//convertir le body de la requette en jsObject
app.use(express.json());

// o defini l'url dappel
app.use("/api/users", userRouter);
app.use("/api/vehicules", vehicleRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("server up and running on port : ", process.env.APP_PORT);
});