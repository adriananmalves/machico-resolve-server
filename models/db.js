const Sequelize = require('sequelize');
const sequelize = new Sequelize('db', 'root', '', 
  {dialect: 'mysql', host: 'localhost'});
 
 const db = {};

 db.Sequelize = Sequelize;
 db.sequelize = sequelize;

 db.utilizadores = require("./utilizadores.js")(sequelize,Sequelize);
 db.ocorrencias = require("./ocorrencias.js")(sequelize, Sequelize);
 db.categorias = require("./categorias.js")(sequelize, Sequelize);
 db.estado = require("./estado.js")(sequelize, Sequelize);
 db.avaliacao = require("./avaliacao.js")(sequelize, Sequelize);
 db.papel = require("./papel.js")(sequelize, Sequelize);
 db.fotos = require ("./fotos.js")(sequelize, Sequelize);

 db.utilizadores.hasMany(db.ocorrencias, { as: 'ocorrencia'});
 db.ocorrencias.belongsTo(db.utilizadores, { as: 'utilizador'});

 db.categorias.hasOne(db.ocorrencias, { as: 'categoria'});
 
 db.estado.hasOne(db.ocorrencias, { as: 'estado' });

 db.utilizadores.hasMany(db.avaliacao, { as: 'avaliacao'});
 db.avaliacao.belongsTo(db.utilizadores, { as: 'utilizador'});

 db.papel.hasOne(db.utilizadores, {as: 'papel'});
 
 db.ocorrencias.hasMany(db.fotos, {as: 'foto'});
 db.fotos.belongsTo(db.ocorrencias);
 


module.exports = db;
