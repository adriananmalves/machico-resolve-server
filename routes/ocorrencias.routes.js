module.exports = app =>{
	const ocorrencias = require('../controllers/ocorrencias.controller.js');

	

	app.post('/criarocorrencias', ocorrencias.createOcorrencia);

	app.get('/ocorrencias', ocorrencias.findAll);

	app.get('/ocorrencias/:id', ocorrencias.findOne);

	app.get('/ocorrenciascriadas/:id', ocorrencias.findByUserId);

	app.put('/ocorrencias/:id', ocorrencias.update);

	app.delete('/ocorrencias/:id', ocorrencias.delete);

	app.delete('/ocorrencias', ocorrencias.deleteAll);

	app.get('/ocorrenciasemexecucao/:id', ocorrencias.findByEstado);



	
};