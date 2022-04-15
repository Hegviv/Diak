const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');

fs.open('adat.db', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});

const db = new sqlite3.Database("./adat.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
  
    console.log("connection succesful");
  });
  
db.run('CREATE TABLE adatok(id INTEGER PRIMARY KEY AUTOINCREMENT, vezetek TEXT NOT NULL, kereszt TEXT NOT NULL, email TEXT UNIQUE NOT NULL , szulev TEXT NOT NULL, osztaly TEXT NOT NULL)');

