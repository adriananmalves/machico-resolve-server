module.exports = app =>{
	const categoria = require('../controllers/categoria.controller.js');

	
	app.get('/categoria', categoria.findAll);

	



	
};