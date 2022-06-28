module.exports = (sequelize, Sequelize) => {
    const Fotos = sequelize.define('fotos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName:true
})
 
return Fotos;
};
 