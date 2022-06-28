module.exports = (sequelize, Sequelize) => {
    const Papel = sequelize.define('papel', {
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
 
return Papel;
};
 