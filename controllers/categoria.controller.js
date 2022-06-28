const db = require('../models/db.js');
const Categoria = db.categorias;


exports.findAll = async (req, res) => {
	const categoria = await Categoria.findAll();
	if(!categoria){
		return res.status(200).send({
			status: 404,
			message: 'No data found'
		}); 
	}

	res.status(200).send({
		categoria
	});
};