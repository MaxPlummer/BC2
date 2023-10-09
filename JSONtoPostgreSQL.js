/* Import modules/files possibly needed to correctly run the script */
import { Sequelize, Model, DataTypes,  QueryTypes, sql } from '@sequelize/core';
  
// imports dontenv module and allows us to access stored environment variables stored in .env file
import 'dotenv/config';

//Import file system - Examples of how to use the file system module - fs
import * as fs from 'fs';

//imports the Listing Model we created in ListingModels.js
import { Listing } from './ListingModel.js';

/* Connect to your database */
const sequelize = new Sequelize(process.env.API_URL);

//Testing that the .env file is working - This should print out the port number
console.log(process.env.PORT); //Should print out 8080 
console.log(process.env.API_Key); //Should print out "Key Not set - starter code only"

try {
    //Setup table in the DB
    await Listing.sync({ force: true });
    console.log("The table for the Listing model was just (re)created!");
  
    /*
    This callback function read the listings.json file into memory (data) and stores errors in (err).
    Write code to save the data into the listingData variable and then save each entry into the database.
    */
    fs.readFile('listings.json', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);

    //Save and parse the data from the listings.json file into a variable to iterate through each instance
        const listingData = JSON.parse(data);

        //Use Sequelize create a new row in our database for each entry in our listings.json based on the ListingModel
      for (let i = 0; i < listingData.entries.length; i++) {
          // iterates over the entire listings.json file and inspects each entry
          const temp = listingData.entries.at(i);
          // the coordinates are added to a temporary array as floats if they are present in the entry
          const tempArr = [0, 0];
          if (temp.coordinates) {
            tempArr[0] = temp.coordinates.latitude;
            tempArr[1] = temp.coordinates.longitude;
          }
          if (temp.coordinates) {
              // entries with coordinates are created in the database here as not to include the array of zeros
              Listing.create( { code: temp.code, name: temp.name, latitude: tempArr[0], 
                               longitude: tempArr[1], address: temp.address});
          }
          else {
              // entries without the coordinates listed are created in the database here
              Listing.create( { code: temp.code, name: temp.name, address: temp.address});
              // some entries include no address, but the ListingModel allows that field to be null
          }
      }
    });
}
catch (error) {
    // error message if unable to connect to database
    console.error('Unable to connect to the database:', error);
}
 
