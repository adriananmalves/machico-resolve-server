const db = require('../models/db.js');
const Ocorrencia = db.ocorrencias;
const Op = db.Sequelize.Op;
const Utilizador = db.utilizadores;


module.exports = {
	async createOcorrencia(req, res){
		const { descricao, localizacao, utilizadorId, categoriumId, estadoId} = req.body;

		const utilizador = await Utilizador.findByPk(utilizadorId);

		if(!utilizador){
			return res.status(400).json({error: 'User not found'});
		}

		const ocorrencia = await Ocorrencia.create({
			descricao,
			localizacao,
			utilizadorId,
			categoriumId,
			estadoId
		});

		return res.status(200).send({
			ocorrencia,
			id: ocorrencia.id,
			message: 'Ocorrência criada com sucesso'
		}); 
	},


	

	async findAll(req, res){
		const ocorrenciasDetalhes = await Ocorrencia.findAll();

		if(!ocorrenciasDetalhes){
			return res.status(200).send({
				status: 404,
				message: 'No data found'
			}); 
		}
	
		res.status(200).send({
			ocorrenciasDetalhes
		});


	},

	async findOne(req, res){
		const ocorrenciasDetalhes = await Ocorrencia.findByPk(req.params.id);

		if(!ocorrenciasDetalhes){
			return res.status(200).send({
				status: 404,
				message: 'No data found'
			}); 
		}
	
		res.status(200).send({
			ocorrenciasDetalhes
		});


	},

	async findByUserId(req, res){
		const ocorrenciasDetalhes = await Ocorrencia.findAll({where: {utilizadorId: req.params.id}});

		if(!ocorrenciasDetalhes){
			return res.status(200).send({
				status: 404,
				message: 'No data found'
			});


		}

		res.status(200).send({
			ocorrenciasDetalhes
		});
	},

	async findByEstado(req, res){
		const ocorrenciasDetalhes = await Ocorrencia.findAll({where: {estadoId: req.params.id}});

		if(!ocorrenciasDetalhes){
			return res.status(200).send({
				status: 400,
				message: 'No data found'
			});
		}

		res.status(200).send({
			ocorrenciasDetalhes
		});
	},


	update(req, res){
		const id = req.params.id;
  
		Ocorrencia.update(req.body, {
		where: { id: id }
		})
		.then(num => {
			if (num == 1) {
			res.send({
				message: "Ocorrencia was updated successfully."
			});
			} else {
			res.send({
				message: `Cannot update Ocorrencia with id=${id}. Maybe Utilizador was not found or req.body is empty!`
			});
			}
		})
		.catch(err => {
			res.status(500).send({
			message: "Error updating Ocorrencia with id=" + id
			});
		});
	},


	delete(req, res){
		const id = req.params.id;
	  
		Ocorrencia.destroy({
		  where: { id: id }
		})
		  .then(num => {
			if (num == 1) {
			  res.send({
				message: "Ocorrencia was deleted successfully!"
			  });
			} else {
			  res.send({
				message: `Cannot delete Ocorrencia with id=${id}. Maybe Ocorrencia was not found!`
			  });
			}
		  })
		  .catch(err => {
			res.status(500).send({
			  message: "Could not delete Ocorrencia with id=" + id
			});
		  });
	},

	deleteAll(req, res){
		Ocorrencia.destroy({
		  where: {},
		  truncate: false
		})
		  .then(nums => {
			res.send({ message: `${nums} Ocorrencias were deleted successfully!` });
		  })
		  .catch(err => {
			res.status(500).send({
			  message:
				err.message || "Some error occurred while removing all ocorrencias."
			});
		  });
	  }

	  
};

