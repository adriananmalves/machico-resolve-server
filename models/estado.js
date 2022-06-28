module.exports = (sequelize, Sequelize) => {
    const Estado = sequelize.define('estado', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        
    },
    
     
}, {
    freezeTableName:true
})
 
return Estado;
};
 