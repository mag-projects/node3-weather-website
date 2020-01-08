const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express(); // sets up an instance of express in the app const

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public"); // __dirname gets the direction and then you configure it
const viewsPath = path.join(__dirname, "../templates/views"); // Constant that stores the new VIEWS folder name and path
const partialsPath = path.join(__dirname, "../templates/partials"); // Constant that stores the PARTIALS folder name and path

// Setup handlebars engine and views location
app.set("view engine", "hbs"); // key, setting name, value & is used to setup *****handlebars!!!
app.set("views", viewsPath); // This is how to get express to recognize the new VIEWS name/location
hbs.registerPartials(partialsPath); // Setup for PARTIAL

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Miguel Guzman"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpMessage: `This is some helpful information`,
        title: "Help",
        name: "Miguel Guzman"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Miguel Guzman"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({Error: `Please input an address!`});
    }
    geocode(req.query.address, (error, {lat, long, name} = {}) => {
        if (error) return res.send({error});

        forecast(lat, long, (error, forecastData) => {
            if (error) return res.send({error});
            res.send({
                location: req.query.address,
                weather: forecastData,
                name
            });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404-page", {
        title: "404",
        name: "Miguel Guzman",
        message: "Help article not found!"
    });
});

app.get("*", (req, res) => {
    res.render("404-page", {
        title: "404",
        name: "Miguel Guzman",
        message: "404 Error! The requested page could not be found"
    });
});


app.listen(3000, () => {
    console.log("Starting up the server. Will be available on port 3000");
});


// To get express to watch HBS file changes type.....nodemon app.js -e (extensions) js,hbs
