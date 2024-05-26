const express = require("express");

const fs = require("fs");

const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
//views (1)- let express know where it will find out template files (reserved word)
app.set("view engine", "ejs");
// set helps to set certain options for express app
// view engine - we tell express we wanna a special template engine named view, to process our view files
// ejs - name of the engine

app.use(express.static(path.join(__dirname, "public")));
//sets up a request handler for static files( ex- css, js) or else the file isn't parsed

app.use(express.urlencoded({ extended: false }));

app.listen(3000);

app.get("/restaurants", function (req, res) {
  //   const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  //   res.sendFile(htmlFilePath);

  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);

  const existingRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numberOfRestaurants: existingRestaurants.length,
    restaurants: existingRestaurants,
  });
  // render -parse template file with template engine and convert to html which will be sent to browser
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  //OPEN THE FILE, EDIT THE DATA, STORE IT BACK BELOW
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);

  const existingRestaurants = JSON.parse(fileData);

  existingRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(existingRestaurants));

  res.redirect("/confirm");
});

// app.post('/recommend', function (req, res) {
//     const restaurant = req.body;
//     const filePath = path.join(__dirname, 'data', 'restaurants.json');

//     const fileData = fs.readFileSync(filePath);
//     const storedRestaurants = JSON.parse(fileData);

//     storedRestaurants.push(restaurant);

//     fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

//     res.redirect('/confirm');
//   });

app.get("/", function (req, res) {
  res.render("index");
});
