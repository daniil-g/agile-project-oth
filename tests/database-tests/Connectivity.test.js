const { GetPgClient } = require("../../js/helper/databaseHelper");

test('Connect to Db works', () => {
  //arrange: 
  try {
    const client = GetPgClient();
    expect.assertions(1);
    //act -> connect()
    return client.connect()
      //assert -> "es gibt ein .then()"
      .then(() => {
        console.log("Worked")
        test(1, 1);
      })
      //assert fail() -> bei connect () ist etwas schiefgegangen -> abbrechen/failen
      .catch(error => fail("could not connect to database" + error))
      .finally(client.end());
  } catch (error) {
    console.log(error);
    fail("Could not get client. Reason is:", error);
  }
});

test('Basic - get a entry from Testtable', () => {
  const client = GetPgClient();
  //expect.assertions(1);
  return client.connect().
    then(() => {
      client.query('Select * from TestTable').then(result => {
        test("...");
      }).catch(error => console.log("err"))
    })
    .catch(error => fail("could not connect to database" + error))
    .finally(client.end());
});

test('Basic - Wrong Query should fail', () => {
  const client = GetPgClient();
  //expect.assertions(1);
  return client.connect()
    .then(() => {
      client.query('Select * from TestTable').then(result => {
        console.log(result);
      }).catch(error => {
        console.log("err");
      })
    })
    .catch(error => fail("could not connect to database" + error))
    .finally(client.end());
});