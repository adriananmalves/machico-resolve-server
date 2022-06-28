module.exports = app =>{
	const avaliacao = require('../controllers/avaliacao.controller.js');

	

	app.post('/avaliacao', avaliacao.createAvaliacao);

	app.get('/avaliacao', avaliacao.findAll);

	app.get('/avaliacao/:id', avaliacao.findOne);

	app.put('/avaliacao/:id', avaliacao.update);

	app.delete('/avaliacao/:id', avaliacao.delete);

	app.delete('/avaliacao', avaliacao.deleteAll);



	
};