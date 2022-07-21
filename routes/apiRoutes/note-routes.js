const router = require('express').Router();

const { v4: uuidv4 } = require('uuid');
const {
  getNotes,
  saveNote,
  deleteNote,
  findById
} = require('../../lib/notes');
const { notes } = require('../../db/db.json');

//any routes appended here have /api/ appended to the front, as seen in server.js

//'/api/notes' actually gives http://localhost:3001/api/api/notes

//handles getNotes
//is called when entering page
router.get('/notes', (req, res) => {
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

//handles saveNote
router.post('/notes/', (req, res) => {
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
  
//handles deleteNote
router.delete('/notes/:id', ({body}, res) => {
  const fetchedNote = findById(body.id, insertData);
  
  const result = deleteNote(body, insertData);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});  
  
  
  


//TODO
//handles saveNote
router.delete('/notes', (req, res) => {
  req.body.id = notes.length.toString();
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

module.exports = router;
