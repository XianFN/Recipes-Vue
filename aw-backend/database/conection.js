const Sequelize = require('sequelize');
const sequelize = new Sequelize('bbddjajadaxi', 'jajadaxi', 'jajadaxi', {
    host: '212.183.253.96',
    dialect: 'mysql'
  });
  console.log("lahsdlñjhasdolñi")
  module.exports = {
      
      connection: function(){
       
        sequelize
          .authenticate()
          .then(() => {

            console.log("Conexion correcta")

          })
          .catch(err => {
              console.log("Error al conectarse a la bbdd")
          });
      },
      sequelize
  };