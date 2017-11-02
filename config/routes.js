//Update the name of the controller below and rename the file.
const users = require("../controllers/users.js");
const posts = require("../controllers/posts.js")


module.exports = function(app){

  app.get('/', users.redirect);

  app.get('/gTutor', users.index);

  app.post('/gTutor/login', users.login);

  app.post('/gTutor/register', users.register);

  app.get('/gTutor/request', users.request);

  app.use(requiresLoggedUser);

  // app.get('/gTutor/:id', users.dashboard);
  app.get('/gTutor/:id', posts.getAll);

  app.post('/gTutor/:id', posts.createOne);
  
  app.use(requiresLoggedADMIN);

  function requiresLoggedUser(req, res, next) {
    if (req.session.user || req.session.admin) {
      next();
    } else {
      res.redirect('/gTutor')
    }
  }

  function requiresLoggedADMIN(req, res, next) {
    if (req.session.admin) {
      next();
    } else {
      res.redirect(`/gTutor/${req.session.user}`);
    }
  }


}