const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//------------------------------------------FUNTIONS, previously lib----------------------------------

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
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes }, null, 2) //{zonk} actually changes the objects to zonk, so don't
  );
  return bodyCopy;
}

function deleteNote(body, notes) {
  const bodyCopy = body;
  notes.pull(bodyCopy);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json '),
    JSON.stringify({ notes }, null, 2)
  );
  return bodyCopy;
}
//----------------------------------------API CALLS, previously notes.js, added /api/---------------------------------------------------------



app.get('/api/notes/', (req, res) => {
  console.log("called to get");
  const result = getNotes(req, notes);
  console.log(result);
  res.json(result);
  /*if (result) {
    res.json(result);
  } else {
    res.send(404);
  }*/
});

app.post('/api/notes/', (req, res) => {
  req.body.id = uuidv4();
  console.log("body is " + req.body);
  console.log("insert data is " + notes);
  const result = saveNote(req.body, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.delete('/api/notes/:id', ({body}, res) => {
  const fetchedNote = findById(body.id, insertData);
  
  const result = deleteNote(body, insertData);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

//fix later


// Use routes, previously html route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
