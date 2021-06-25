const pg = require("pg");
const { Pool, Client } = require('pg')
const { GetDatabaseUri } = require("../private/secrets");


/**
 * 
 * @returns {pg.Client} a (hopefully) valid pg.Client Object
 */
exports.GetPgClient = function getpgClient() {
  process.env.DB_CON_STRING = GetDatabaseUri();;
  const conString = process.env.DB_CON_STRING;

  if (conString == undefined) {
    console.log("");
    throw ("RuntimeException", "Connectionstring is not present. Can't connect to postgres")
  }
  const dbConfig = {
    connectionString: conString,
    ssl: { rejectUnauthorized: false }
  }
  var dbClient = new pg.Client(dbConfig);
  return dbClient;
}

const bcrypt = require('bcrypt');
/**
 * Will hash a plaintext password and return the hash 
 * 
 * @param {string} password (plaintext) Password given by the user
 * @returns {string} HashedPassword
 */
exports.HashPassword = function HashPassword(password) {
  const saltRounds = 5;
  const myPlaintextPassword = password;
  const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
  return hash;
}

/**
 * Compares your hashed password from the database against the given password. 
 * 
 * @param {string} PlainTextPassword password given by user
 * @param {string} hashedPassword Hashed password from database
 */
exports.ComparePasswords = function ComparePasswords(PlainTextPassword, hashedPassword) {
  // Load hash from your password DB.
  return bcrypt.compareSync(PlainTextPassword, hashedPassword); // true
}


// function DoDemo() {
//   const client = getpgClient();
//   client.connect().then(x => {
//     console.log("worked");
//     client.query('select * FROM "TestTable" ').then(res => console.log(res.rows));
//   }
//   );

// }
// DoDemo();