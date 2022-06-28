const db = require('../models/db.js');
const Avaliacao = db.avaliacao;
const Utilizador = db.utilizadores;


module.exports = {
	async createAvaliacao(req, res){
		const { avaliacao, descricao, utilizadorId} = req.body;

		const utilizador = await Utilizador.findByPk(utilizadorId);

		if(!utilizador){
			return res.status(400).json({error: 'User not found'});
		}

		const avaliacaoCriada = await Avaliacao.create({
            avaliacao,
			descricao,
			utilizadorId
		});

		return res.json(avaliacaoCriada);
	},


	

	async findAll(req, res){
		const avaliacaoDetalhes = await Avaliacao.findAll();

		if(!avaliacaoDetalhes){
			return res.status(200).send({
				status: 404,
				message: 'No data found'
			}); 
		}
	
		res.status(200).send({
			avaliacaoDetalhes
		});


	},

	async findOne(req, res){
		const avaliacaoDetalhes = await Avaliacao.findByPk(req.params.id);

		if(!avaliacaoDetalhes){
			return res.status(200).send({
				status: 404,
				message: 'No data found'
			}); 
		}
	
		res.status(200).send({
			avaliacaoDetalhes
		});


	},

	update(req, res){
		const id = req.params.id;
  
		Avaliacao.update(req.body, {
		where: { id: id }
		})
		.then(num => {
			if (num == 1) {
			res.send({
				message: "Avaliacao was updated successfully."
			});
			} else {
			res.send({
				message: `Cannot update Avaliacao with id=${id}. Maybe Avaliacao was not found or req.body is empty!`
			});
			}
		})
		.catch(err => {
			res.status(500).send({
			message: "Error updating Avaliacao with id=" + id
			});
		});
	},


	delete(req, res){
		const id = req.params.id;
	  
		Avaliacao.destroy({
		  where: { id: id }
		})
		  .then(num => {
			if (num == 1) {
			  res.send({
				message: "Avaliacao was deleted successfully!"
			  });
			} else {
			  res.send({
				message: `Cannot delete Avaliacao with id=${id}. Maybe Avaliacao was not found!`
			  });
			}
		  })
		  .catch(err => {
			res.status(500).send({
			  message: "Could not delete Avaliacao with id=" + id
			});
		  });
	},

	deleteAll(req, res){
		Avaliacao.destroy({
		  where: {},
		  truncate: false
		})
		  .then(nums => {
			res.send({ message: `${nums} Avaliacoes were deleted successfully!` });
		  })
		  .catch(err => {
			res.status(500).send({
			  message:
				err.message || "Some error occurred while removing all avaliacoes."
			});
		  });
	  }

	  
};

