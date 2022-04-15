const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());

const db = new sqlite3.Database("./adat.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log("Sikerült a kapcsolat");
});

app.get("/view", function (request, response) {
  const sql = 'SELECT * FROM adatok';
  var rows;
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row => {
      console.log(rows);
    }))
    response.send(rows);
  });

});

app.post('/friss/:param', function (request, response) {
  var data = request.params.param.split(';');

  const sql = "INSERT into adatok (vezetek, kereszt, email, szulev, osztaly) values ('" + data[0] + "', '" + data[1] + "', '" + data[2] + "', '" + data[3] + "', '" + data[4] + "')";
  console.log(sql);
  db.run(sql);
  console.log("Új adatok hozzáadva");
});

app.post('/frissit/:param', function (request, response) {
  var data = request.params.param.split(';');
  const sql = "UPDATE adatok SET vezetek='" + data[1] + "', kereszt='" + data[2] + "', email='" + data[3] + "' , szulev='" + data[4] + "', osztaly='" + data[5] + "' WHERE id='" + data[0] + "'";
  console.log(sql);
  db.run(sql);
  console.log("adat frissítve, id: " + data[0]);

});

app.post('/torol/:param', function (request, response) {
  console.log("Deleting...");
  var data =request.params.param;
  const sql = "delete from adatok where id = "+data+"";
  console.log(sql);
  db.run(sql);
  console.log("adat törölve, id: " + data);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("A szerver sikeresen elindult!");
});