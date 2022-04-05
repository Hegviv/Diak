const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());

const db = new sqlite3.Database("./adat.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log("connection succesful");
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

  const sql = "INSERT into adatok (nev, email, cim, kor, kartya) values ('" + data[0] + "', '" + data[1] + "', '" + data[2] + "', '" + data[3] + "', '" + data[4] + "')";
  console.log(sql);
  db.run(sql);
  console.log("New data added");
});

app.post('/update/:param', function (request, response) {
  var data = request.params.param.split(';');
  const sql = "UPDATE adatok SET nev='" + data[1] + "', email='" + data[2] + "', cim='" + data[3] + "' , kor='" + data[4] + "', kartya='" + data[5] + "' WHERE id='" + data[0] + "'";
  console.log(sql);
  db.run(sql);
  console.log("Data updated, id: " + data[0]);

});

app.post('/torol/:param', function (request, response) {
  console.log("Deleting...");
  var data =request.params.param;
  const sql = "delete from adatok where id = "+data+"";
  console.log(sql);
  db.run(sql);
  console.log("data deleted, id: " + data);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server started succesfully!");
});