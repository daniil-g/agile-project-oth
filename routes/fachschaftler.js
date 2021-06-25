var express = require('express');
const { GetPgClient } = require('../js/helper/databaseHelper');
var router = express.Router();

// ROOT/USERS <--- My new root 

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/whoami', function (req, res, next) {
  res.send(`Solltest fachschaftler sein: Ich bin ${req.user}`);
});

router.post('book', function (req, res, next) {
  //handle timebook: 
  //extract data: 
  var datetime = '2021-01-16 15:00'
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

router.post('/addTimeSlot', function (req, res, next) {
  fachschaftler = req.user; //annahme user = fachschaftler
});




module.exports = router;
