const db = require('../models/db.js');
const Utilizador = db.utilizadores;


exports.checkDuplicateEmail = (req, res, next) => {
    Utilizador.findOne({
        where: {
            email: req.body.email 
        }
    }).then(utilizador => {
        if(utilizador){
            res.status(400).send({
                message : "Erro! Esse email já possui conta!"
            });
            return;

        }

        next();
      

    });
};