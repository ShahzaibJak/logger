const express = require('express');
const { reqLogger, errLogger } = require("./middleware/log")
const cors = require("cors");

const app = express();

//Req Logger Middleware
app.use(reqLogger)

//CORS Implementation to simulate errors
const whitelist = []

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 ) {
            callback(null, true)
        } else {
            console.log("Not allowed by CORS")
            callback(new Error("Not allowed by CORS Policy."));
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

//Demo URL for Testing Logs
app.get("/", (req, res) => {
    res.status(200).send('<h1>Index</h1>');
});

//404 Route
app.all("*", (req, res) => {
    res.status(404).send("<h1>404 Not Found</h1>")
})

//Error Logger Handler
app.use(errLogger)

app.listen(3000, () => { console.log("Listeing on 3000") })