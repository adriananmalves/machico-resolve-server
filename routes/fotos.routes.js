module.exports = app =>{
	const fotos = require('../controllers/fotos.controller.js');

	

	app.post('/criarfotos', fotos.createFotos);
	app.get('/verfotos', fotos.findAll);



	
};