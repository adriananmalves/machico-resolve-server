module.exports = app =>{
	const utilizadores = require('../controllers/utilizadores.controller.js');
	const verificarRegisto = require('../middleware/verificarRegisto.js');
	const authJWT = require("../middleware/authjwt.js");


	app.use(function(req, res, next) {
		res.header(
		  "Access-Control-Allow-Headers",
		  "x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});
	

	app.post('/utilizadores', [verificarRegisto.checkDuplicateEmail], utilizadores.create);

	app.get('/utilizadores', utilizadores.findAll);

	app.get('/utilizadores/:id', utilizadores.findOne);

	app.put('/utilizadores/:id', utilizadores.update);

	app.delete('/utilizadores/:id', utilizadores.delete);

	app.delete('/utilizadores', utilizadores.deleteAll);

	app.post('/auth', utilizadores.login);

	app.get('/auth/user', [authJWT.verificarToken], utilizadores.userBoard);


	
};