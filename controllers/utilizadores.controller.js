const db = require('../models/db.js');
const Utilizador = db.utilizadores;
const Papel = db.papel;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

exports.create = async (req, res) => {
	if(!req.body.nome){
		res.status(400).send({
			message: 'Content can not be empty'
		});
		return;
	};

	const papel = await Papel.findByPk(req.body.papelId);

		if(!papel){
			return res.status(400).json({error: 'Papel not found'});
		}


	const senha = req.body.password;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(senha, salt);

	const utilizador = {
		nome: req.body.nome,
		cc: req.body.cc,
		morada: req.body.morada,
		telemovel: req.body.telemovel,
		email: req.body.email,
		password: hash,
		papelId: req.body.papelId
	};

	Utilizador.create(utilizador)
		.then(data => {
	
			res.send({
				data,
				message: 'Utilizador criado com sucesso'
			});
			
		})

		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occured while creating the utilizador.'
			});
		});

};



exports.findAll = async (req, res) => {
	const utilizador = await Utilizador.findAll();
	if(!utilizador){
		return res.status(200).send({
			status: 404,
			message: 'No data found'
		}); 
	}

	res.status(200).send({
		utilizador
	});
};

exports.findOne = async (req, res) =>{
	const utilizador = await Utilizador.findByPk(req.params.id);

	if(!utilizador){
		return res.status(200).send({
			status: 400,
			message: 'No data found'
		});
	}

	res.status(200).send({
		utilizador
	});

};

exports.update = (req, res) => {
	const id = req.params.id;
  
	Utilizador.update(req.body, {
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
		  res.send({
			message: "Utilizador was updated successfully."
		  });
		} else {
		  res.send({
			message: `Cannot update Utilizador with id=${id}. Maybe Utilizador was not found or req.body is empty!`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error updating Utilizador with id=" + id
		});
	  });
  };

  exports.delete = (req, res) => {
	const id = req.params.id;
  
	Utilizador.destroy({
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
		  res.send({
			message: "Utilizador was deleted successfully!"
		  });
		} else {
		  res.send({
			message: `Cannot delete Utilizador with id=${id}. Maybe Tutorial was not found!`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Could not delete Utilizador with id=" + id
		});
	  });
  };

  exports.deleteAll = (req, res) => {
	Utilizador.destroy({
	  where: {},
	  truncate: false
	})
	  .then(nums => {
		res.send({ message: `${nums} Utilizadores were deleted successfully!` });
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while removing all utilizadores."
		});
	  });
  };

  exports.login = (req, res) => {
	Utilizador.findOne({
	  where: {
		email: req.body.email
	  }
	})
	  .then(utilizador => {
		if (!utilizador) {
		  return res.status(200).send({ message: "User Not found."});
		}
		
		/*var passwordIsValid = bcrypt.compare(
			req.body.password,
			utilizador.password
		  );*/

		 bcrypt.compare(req.body.password, utilizador.password, function(err, result) {
			if (err) { throw (err); }
			console.log(result);
			if(result){

				var token = jwt.sign({ id: utilizador.id }, config.secret, {
					expiresIn: 86400 // 24 hours
				  });
	
				return res.status(200).send({
					id: utilizador.id,
					nome: utilizador.nome,
					cc: utilizador.cc,
					telemovel: utilizador.telemovel,
					morada: utilizador.morada,
					email: utilizador.email,
					papelId: utilizador.papelId,
					accessToken: token,
					message: "Login efetuado com sucesso"
				  });
				
			
		}else{
			return res.status(401).send({
				accessToken: null,
				message: "Invalid Password!"
			  });
			

		}
		

		}
		);
	
		  

		
		

  
			
			  
			
		
  	
	  })
	  .catch(err => {
		res.status(500).send({ message: err.message });
	  });
  };

  exports.userBoard = (req, res) => {
	res.status(200).send("User Content.");
  };