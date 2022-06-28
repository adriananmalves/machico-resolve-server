const db = require('../models/db.js');
const Estado = db.estado;


exports.findAll = async (req, res) => {
	const estado = await Estado.findAll();
	if(!estado){
		return res.status(200).send({
			status: 404,
			message: 'No data found'
		}); 
	}

	res.status(200).send({
		estado
	});
};

exports.findById = async (req, res) => {
	const estado = await Estado.findByPk(req.params.id);

	if(!estado){
		return res.status(200).send({
			
			status: 400,
			message: 'No data found'
		})
	}

	res.status(200).send({
		estado
	})
};