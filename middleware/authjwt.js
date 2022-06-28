const jwt = require ('jsonwebtoken');
const config = require ('../config/auth.config.js');
const db = require ('../models/db.js');
const Utilizador = db.utilizadores;

exports.verificarToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    /*
    if(typeof bearedHeader !== 'undefined'){
        const bearer = bearedHeade.split(' ');

        const bearerToken = beared[1];

        req.token = bearerToken;

        next();

    }else{
        res.sendStatus(403);
    }*/
    if(!token){
        return res.status(403).send({
            message: "Não existe nenhum token"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) =>{
        if(err){
            return res.status(401).send({
                message: "Não autorizado!"
            });
        }

        req.utilizadorId = decoded.id;
        next();
    }); 
}