const fs = require("fs");
const path = require("path");

const express = require("express");

const defaultRoutes = require("./routes/defaults");
const resRoutes = require("./routes/restaurants");

const app = express();

app.set("views", path.join(__dirname, "views"));
//views (1)- let express know where it will find out template files (reserved word)
app.set("view engine", "ejs");
// set helps to set certain options for express app
// view engine - we tell express we wanna a special template engine named view, to process our view files
// ejs - name of the engine

app.use(express.static(path.join(__dirname, "public")));
//sets up a request handler for static files( ex- css, js) or else the file isn't parsed
//middleware
app.use(express.urlencoded({ extended: false }));
//middleware


app.use("/", defaultRoutes);
app.use('/', resRoutes);


app.use(function(req,res)
{
  res.status(404).render('404');
})
// error function for every other incorrect routes

app.use(function(error,req,res,next){
  res.status(500).render('500');
})
app.listen(3000);
