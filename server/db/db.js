const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL ||
    // "postgres://corey:password@localhost:5432/population",
    "postgres://aajmbffjgiwpkb:868aef96f0c4480c2b0e65c90accb969f28a6d67dfc93039b0b9c52e85f35b83@ec2-54-159-22-90.compute-1.amazonaws.com:5432/dbkolr8182255i",
  {
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = db;
