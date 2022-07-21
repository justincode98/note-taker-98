const router = require('express').Router();
//const indexRoutes = require('./index');
const notesRoutes = require('../apiRoutes/note-routes');

//router.use(indexRoutes); THROWS  throw new TypeError('Router.use() requires a middleware function') TypeError: Router.use() requires a middleware function IF LEFT IN 
router.use(notesRoutes);

module.exports = router;