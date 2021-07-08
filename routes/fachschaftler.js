var express = require('express');
const { GetPgClient } = require('../js/helper/databaseHelper');
var router = express.Router();

// var urlencodedParser = bodyParser.urlencoded({ extended: false });

// ROOT/USERS <--- My new root 

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('fachschaftler');
});

/* GET users listing. */
router.get('/whoami', function (req, res, next) {
  res.send(`Solltest fachschaftler sein: Ich bin ${req.user}`);
});

router.post("/makeTimeAvailible", function (req, res) {
  console.log(req.body.datetimeFrom);
  const from = req.body.datetimeFrom; //2021-06-24T10:00
  console.log(req.body.datetimeTo);
  const to = req.body.datetimeTo;  //2021-06-24T11:00
  fachschaftler_id = 2;
  if (from === "" ||
    from === undefined ||
    to === "" ||
    to === undefined) {
    res.render("fachschaftler", { error_book: "Bitte Zeiten auswählen" })
    return;
  }

  pgClient = GetPgClient();
  pgClient.connect()
    .then(function () {
      queryAddBooking =
        `INSERT INTO "bookableTime" ("datetime_from", "datetime_to", "fachschaftler_id")
        VALUES ('${from}', '${to}', '2');`
      pgClient.query(queryAddBooking)
        .then(res.render("fachschaftler", { success: "Buchung wurde übernommen" }))
        .catch(error => {
          console.log(error);
          res.render("fachschaftler", { error_book: "Fehler beim eintragen der Zeit in die Datenbank" })
        })
    })
    .catch(error => res.render("fachschaftler", { error_book: "Fehler bei der Verbindung zur Datenbank" }));
})



router.post('/test', function (req, res, next) {
  //handle timebook: 
  //extract data: 
  var datetime = '2021-01-16 15:00'
  var datetime = req.body.datetimeFrom;
  var duration = 1; //1h
  var user = req.user;
  pgClient = GetPgClient();
  pgClient.connect().then(x => {
    queryGetBookable =
      "SELECT * \
      FROM 'bookableTime' \
      WHERE \
      datetime_from <= '2021-06-22T15:00:00.000' AND \
      duration_to >= '2021-06-22T16:00:00.000'";
    pgClient.query(queryGetBookable).then(res => {
      if (res.rows.length === 0) {
        //noone got time for you
        throw "Time not availible";
      }
      fachschaftler = res.rows[0].fachschaftler;
      /*
        INSERT INTO "bookings" ("datetime", "duration", "student_id", "faculty_id")
        VALUES ('''2021-06-22T15:00:00.000'' ', '1', '1', '2');
      */
      queryAddBooking = ` INSERT INTO "bookings" ("datetime", "duration", "student_id", "faculty_id") \
                          VALUES ('2021-06-22T15:00:00.000', '1', ${user}, ${fachschaftler});`
      pgClient.query(queryAddBooking).then(console.log("worked")); //todo return success
    })
  })
});

router.post("/getTimesForDate?", function (req, res, next) {
  console.log(req.body);
  res.setHeader("Content-Type", "application/json");
  date = req.body.date;
  console.log(date);
  fachschaftler_id = req.body.fachschaftler_id;
  console.log(fachschaftler_id);
  //SELECT * FROM "bookableTime" WHERE "datetime_from" > '2021-06-24 00:00' AND "datetime_to" < '2021-06-24 23:59' LIMIT 50

  pgClient = GetPgClient();
  pgClient.connect().then(x => {
    times = [];
    queryGetTimes = `SELECT * FROM "bookableTime" WHERE "datetime_from" > '${date} 00:00' AND "datetime_to" < '${date} 23:59' LIMIT 50`
    pgClient.query(queryGetTimes)
      .then(result => {
        console.log(result.rows);
        times = result.rows;

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ result: times }));
      })
      .catch(error => console.log(error))

  })
    .catch(error => {
      res.status(503);
      res.end();
    })

});

module.exports = router;



