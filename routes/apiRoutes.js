const notesData = require("../db/db.json");
const fs = require("fs");

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    return res.json(notesData);
  });

  app.post("/api/notes", function(req, res) {
    const note = req.body;
    if (notesData.length == 0) {
      note.id = 1;
    } else {
      note.id = notesData[notesData.length - 1].id + 1;
    }
    notesData.push(note);
    console.log(notesData);

    fs.writeFile("/db/db.json", JSON.stringify(notesData), (results, err) => {
      if (err) console.log(err);
      res.json(results);
    });
  });

  app.delete("/api/notes/:id", (req, res) => {
    const deleted = notesData.findIndex(i => i.id == req.params.id);
    notesData.splice(deleted, 1);
    reWrite();
    res.json(notesData);
  });

  let reWrite = () => {
    let newData = JSON.stringify(notesData);
    fs.writeFile("db/db.json", newData, err => {
      if (err) throw err;
    });
  };
};