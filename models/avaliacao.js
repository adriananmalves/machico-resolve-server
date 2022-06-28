module.exports = (sequelize, Sequelize) => {
    const Avaliacao = sequelize.define('avaliacao', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    avaliacao: {
        type: Sequelize.INTEGER,
        
    },
    descricao: {
        type: Sequelize.STRING
    },
     
}, {
    freezeTableName:true
})
 
return Avaliacao;
};