import { Sequelize, Model, DataTypes,  QueryTypes, sql } from '@sequelize/core';

  //imports dontenv module and allows us to access stored environment variables stored in .env file
  import 'dotenv/config';

  import { Listing } from './ListingModel.js';
/* Connect to your database */
const sequelize = new Sequelize(process.env.API_URL);

// For this starter code I will use async-await and regular async functional notation.
try {
    /* Testing the Connection */
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
}
catch (error) {
    // error if unable to connect to database
    console.error('Unable to connect to the database:', error);
}

/* Retrieve all listings in the database, and log them to the console */
async function retrieveAllListings() {
    console.log('Retrieving all listings');
    // the findAll() function gets all entries in the Listing table
    const listing = await Listing.findAll();
    // prints all listings to the console
    console.log("All listings:", JSON.stringify(listing, null, 2));
}

/* Find the document that contains data corresponding to Library West, then log it to the console */
async function findLibraryWest() {
    console.log('Finding Library West');
    // findOne() gets one entry with the specified parameters
    const listing = await Listing.findOne( {where: { code: 'LBW', name: 'Library West' } });
    if (listing === null) {
        console.log('Not found!');
    } else {
        // print the code and name once found
        console.log("Listing found:", JSON.stringify(listing, null, 2));
    }
}

/* Find the document with the code 'CABL' and remove this listing */
async function removeCable() {
    console.log('Removing Cable BLDG');
    // find the entry to remove
    const listing = await Listing.findOne( {where: { code: 'CABL', name: 'Course viewed only on cable TV' } });
    if (listing === null) {
        console.log('Not found!');
    }
    else {
        // print the entry's code and name
        console.log("Deleted listing:", JSON.stringify(listing, null, 2));
        // destroy() removes the entry with the specified parameters
        const removed = await Listing.destroy( {where: { code: 'CABL', name: 'Course viewed only on cable TV' } });
    }
}

/* Create a listing for the new Data Science and IT (DSIT) Building. Add the code and name to the database */
async function addDSIT() {
    console.log('Adding the new DSIT BLDG that will be across from Reitz union. Bye Bye CSE, Hub, and French Fries.');
    // findOrCreate() finds the entry if it exists or creates the specified entry if it does not exist already
    const [listing, created] = await Listing.findOrCreate({
        where: { code: 'DSIT', name: 'Data Science and IT Building' } });
    if (created) {
        // print the new entry
        console.log("New listing:", JSON.stringify(listing, null, 2));
    }
    else if (listing) {
        // print the existing entry
        console.log("Listing found:", JSON.stringify(listing, null, 2));
    }
}
   

/* The Phelps Lab address is incorrect. Find the listing, update it with the correct address.
Then log the updated listing in the database and use console.log to inspect it. */
async function updatePhelpsLab() {
    console.log('UpdatingPhelpsLab.');
    // update() revises the entry's specified attribute(s)
    const listing = await Listing.update({ address: '1953 Museum Rd, Gainesville, FL 32603'},
        { where: { code: 'PHL', name: 'Phelps Laboratory' } });
    const newListing = await Listing.findOne( {where: { code: 'PHL', name: 'Phelps Laboratory' } });
    if (newListing === null) {
        console.log('Not found!');
    }
    else {
        // print the revised entry to the console
        console.log("Revised listing:", JSON.stringify(newListing, null, 2));
    }
}

console.log("Use these calls to test that your functions work. Use console.log statements in each so you can look at the terminal window to see what is executing. Also check the database.")
// Calling all the functions to test them
// retrieveAllListings()
// removeCable();
// addDSIT();
// updatePhelpsLab();
// findLibraryWest();
