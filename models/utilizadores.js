module.exports = (sequelize, Sequelize) => {
    const Utilizador = sequelize.define('utilizador', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cc: {
        type: Sequelize.INTEGER
    },
    morada:{
        type: Sequelize.STRING

    },
    telemovel:{
        type: Sequelize.INTEGER
    },
    email:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
   
}, {
    freezeTableName:true
})
 
return Utilizador;
};
 
