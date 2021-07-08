  const { GetPgClient } = require('../js/helper/databaseHelper');
  const from = "2021-06-20T10:00"
  const to = "2021-06-20T11:00"
  fachschaftler_id = 2;
  pgClient = GetPgClient();

  pgClient.connect()
    .then(() => {
      const queryAddBooking =
        `INSERT INTO "bookableTime" ("datetime_from", "datetime_to", "fachschaftler_id")
      VALUES ('${from}', '${to}', '2');
      `
      console.log("Query is");
      console.log(queryAddBooking);
      pgClient.query(queryAddBooking)
        .then(res=>console.log("Buchung wurde übernommen",res))
        .catch(error => {
          console.log(error);
        })
    })
    .catch(console.log("Fehler bei der Verbindung zur Datenbank"));