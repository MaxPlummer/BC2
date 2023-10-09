/* Import Sequelize and other libraries */
import { Sequelize, Model, DataTypes } from '@sequelize/core';

//imports dontenv module and allows us to access stored environment variables stored in .env file
import 'dotenv/config';

/* Connect to your database */
const sequelize = new Sequelize(process.env.API_URL);

/* Create Sequelize Model for Listing */
const Listing = sequelize.define('Listing', {
  // Model attributes are defined here
  // Building code is required
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // name is required
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // coordinates (optional) stored as separate floats
  latitude: {
    type: DataTypes.FLOAT,
  },
  longitude: {
    type: DataTypes.FLOAT,
  },
  // address is also optional
  address: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
  tableName: 'Listings'
});

// `sequelize.define` also returns the model
console.log(Listing === sequelize.models.Listing); // true
console.log(Listing);

/* Export the model to make it available to other parts of the Node application */
//Export the model 'Listing' in a single statement at the end of the module
export { Listing };
