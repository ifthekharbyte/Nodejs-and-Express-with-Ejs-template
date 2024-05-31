const express = require('express');

const resData = require("../util/restaurant-data");
const uuid = require("uuid");

const router = express.Router();

router.get("/restaurants", function (req, res) {
    //   const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
    //   res.sendFile(htmlFilePath);
  
    existingRestaurants = resData.getStoredRestaurants();
  
    res.render("restaurants", {
      numberOfRestaurants: existingRestaurants.length,
      restaurants: existingRestaurants,
    });
    // render -parse template file with template engine and convert to html which will be sent to browser
  });
  
router.get('/restaurants/:id', function (req, res) {
    const restaurantId = req.params.id;
  
  
   existingRestaurants = resData.getStoredRestaurants();
  
    for(const restaurant of  existingRestaurants)
    {
      if (restaurant.id === restaurantId)
      {
        return res.render('restaurants-detail', { restaurant : restaurant});
      }
    }
  
    res.status(404).render("404");
  
  
  });
  
router.get("/confirm", function (req, res) {
    res.render("confirm");
  });
  
  
router.get("/recommend", function (req, res) {
    res.render("recommend");
  });
  
router.post("/recommend", function (req, res) {
    const restaurant = req.body;
  
    restaurant.id = uuid.v4();
    //OPEN THE FILE, EDIT THE DATA, STORE IT BACK BELOW
     const existingRestaurants = resData.getStoredRestaurant();
  
    existingRestaurants.push(restaurant);
  
    resData.storedRestaurants();
  
    res.redirect('/confirm');
  });
  
  module.exports = router;