const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,".." ,"data", "restaurants.json");
// making filePath global so it can be accessible by all functions

function getStoredRestaurants() {

const fileData = fs.readFileSync(filePath);
// fs will not be available unless we require it

const existingRestaurants = JSON.parse(fileData);

return existingRestaurants;
}

function storedRestaurants( restaurants){

fs.writeFileSync(filePath, JSON.stringify(existingRestaurants));
}


// one file won't be available in another file, we have to require it.
// file will also not be available if we donot export it

module.exports =
{
    getStoredRestaurants : getStoredRestaurants,
    storedRestaurants : storedRestaurants,

}