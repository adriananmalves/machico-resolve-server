const db = require('../models/db.js');
const Fotos = db.fotos;
const Op = db.Sequelize.Op;
const Ocorrencia = db.ocorrencias;


module.exports = {
	async createFotos(req, res){
		const { nome, ocorrenciumId} = req.body;

		const ocorrencia = await Ocorrencia.findByPk(ocorrenciumId);

		if(!ocorrencia){
			return res.status(400).json({error: 'Ocorrencia not found'});
		}

		const foto = await Fotos.create({
			nome,
            ocorrenciumId,
		});

		return res.status(200).send({
			foto,
			id: foto.id,
			message: 'Foto criada com sucesso'
		}); 
	},


	

	async findAll(req, res){
		const fotosDetalhes = await Fotos.findAll();

		if(!fotosDetalhes){
			return res.status(200).send({
				status: 404,
				message: 'No data found'
			}); 
		}
	
		res.status(200).send({
			fotosDetalhes
		});


	},

	async findOne(req, res){
		const fotosDetalhes = await Fotos.findByPk(req.params.id);

		if(!fotosDetalhes){
			return res.status(200).send({
				status: 404,
				message: 'No data found'
			}); 
		}
	
		res.status(200).send({
			fotosDetalhes
		});


	},

	

	update(req, res){
		const id = req.params.id;
  
		Fotos.update(req.body, {
		where: { id: id }
		})
		.then(num => {
			if (num == 1) {
			res.send({
				message: "Photo was updated successfully."
			});
			} else {
			res.send({
				message: `Cannot update Photo with id=${id}. Maybe Photo was not found or req.body is empty!`
			});
			}
		})
		.catch(err => {
			res.status(500).send({
			message: "Error updating Photo with id=" + id
			});
		});
	},


	delete(req, res){
		const id = req.params.id;
	  
		Fotos.destroy({
		  where: { id: id }
		})
		  .then(num => {
			if (num == 1) {
			  res.send({
				message: "Ocorrencia was deleted successfully!"
			  });
			} else {
			  res.send({
				message: `Cannot delete photo with id=${id}. Maybe Ocorrencia was not found!`
			  });
			}
		  })
		  .catch(err => {
			res.status(500).send({
			  message: "Could not delete photo with id=" + id
			});
		  });
	},

	deleteAll(req, res){
		Fotos.destroy({
		  where: {},
		  truncate: false
		})
		  .then(nums => {
			res.send({ message: `${nums} Photos were deleted successfully!` });
		  })
		  .catch(err => {
			res.status(500).send({
			  message:
				err.message || "Some error occurred while removing all photos."
			});
		  });
	  }

	  
};

