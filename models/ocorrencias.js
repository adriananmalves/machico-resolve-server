module.exports = (sequelize, Sequelize) => {
    const Ocorrencia = sequelize.define('ocorrencia', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.STRING,
        
    },
    localizacao: {
        type: Sequelize.STRING
    },
     
}, {
    freezeTableName:true
})
 
return Ocorrencia;
};
 
