const Sequelize = require("sequelize");
const db = require("../db");

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "AS",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "CM",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "TT",
  "UT",
  "VT",
  "VA",
  "VI",
  "WA",
  "WV",
  "WI",
  "WY",
];

const Booking = db.define("booking", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  menu: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  suggestedDonation: {
    type: Sequelize.FLOAT,
   
  },
  startDateTime: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  endDateTime: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  maxSeats: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
      min: 1,
    },
  },
  openSeats: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 0,
    },
  },
  address1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: Sequelize.ENUM(states),
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5, 5],
    },
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT,
  }
});

module.exports = Booking
