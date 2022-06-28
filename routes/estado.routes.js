module.exports = app =>{
	const estado = require('../controllers/estado.controller.js');

	
	app.get('/estado', estado.findAll);
	app.get('/estado/:id', estado.findById);

	
	
};