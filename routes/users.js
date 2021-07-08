var express = require('express');
const { GetPgClient } = require('../js/helper/databaseHelper');
var router = express.Router();

// ROOT/USERS <--- My new root 

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users');
});

/* GET users listing. */
router.get('/test', function (req, res, next) {
  res.send('respond with a test');
});


/* POST MESSAGES*/

router.post("/bookTime", function (req, res) {
  /** @type {String} */
  const from = req.body.datetimeFrom; //2021-06-24T10:00
  const temp = parseInt(from.slice("2021-06-24T".length, "2021-06-24T".length + 2)) + 1
  const to = from.substr(0, "2020-06-04T".length) + temp + ":00"

  if (from === "" || from === undefined) {
    res.render("users", { error: "Bitte eine Zeit auswählen" })
    return;
  }
  //SELECT *   FROM "bookableTime"   WHERE   datetime_from<= '2021-06-24T10:00' AND   datetime_to>= '2021-06-24T11:00'
  queryGetBookable =
    `SELECT * \
  FROM "bookableTime" \
  WHERE \
  datetime_from <= '${from}' AND \
  datetime_to >= '${to}'`;
  console.log("Query um login zeiten herauszufinden");
  console.log(queryGetBookable);
  /**@type {pg.Client} */
  pgClient = GetPgClient();
  pgClient.connect().then(x => {
    pgClient.query(queryGetBookable)
      .then((result) => {
        if (result.rows.length === 0) {
          console.log("Angefragte Zeit hat keiner Schicht");
          res.render("users", { error: "Leider ist in dieser Zeit die Fachschaft nicht belegt" })
          return;
        }
        else {
          //we assume atleast one has time for us: 
          queryInsert =
            `INSERT INTO "bookings" ("datetime", "duration", "student_id", "faculty_id")
          VALUES ('${from}', '15', '1', '2');`
          console.log("insertQuery: ", queryInsert);
          pgClient.query(queryInsert)
            .then(() => {
              console.log("angelegt!")
              res.render("users", { success: "Buchung wurde übernommen", bookingValue: from });
              return;
            })
            .catch(error => {
              console.log("While inserting into the db something went wrong!");
              res.render("users", { error: "Fehler beim anlegen der Buchung" });
            })
        }

      })
      .catch(error => {
        console.log(error);
        res.render("users", { error: "Fehler beim Anfragen der Daten aus der Datenbank" });
        return;
      })
  });
});




module.exports = router;
