const fs = require('fs');
const path = require('path');

function getNotes(query, database) {
  return JSON.parse(fs.readFileSync("./db/db.json"));
}

function findById(id, database) {
  const result = database.filter(noteItem => noteItem.id === id)[0];
  return result;
}

//works
function saveNote(body, notes) {
  console.log("save attenoted");
  const bodyCopy = body;
  notes.push(bodyCopy);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes }, null, 2) //{zonk} actually changes the objects to zonk, so don't
  );
  return bodyCopy;
}

function deleteNote(body, notes) {
  const bodyCopy = body;
  notes.pull(bodyCopy);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes }, null, 2)
  );
  return bodyCopy;
}



module.exports = {
  getNotes,
  deleteNote,
  findById,
  saveNote
};
