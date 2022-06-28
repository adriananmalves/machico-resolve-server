const express = require('express');
const cors = require('cors');
const db = require("./models/db.js");
const app = express();
const { diskStorage } = require('multer');
var multer  = require('multer')



 var corsOptions = {
  origin: 'http://localhost:8081'
 };

 app.use(cors(corsOptions));


 app.use(express.json()); 

 app.use(express.urlencoded({extended: true}));


db.sequelize.sync();
/* db.sequelize.sync({force:true}).then(() => {
  console.log("Drop and re-sync db.");
 });*/

 app.get("/", (req, res) => {
  res.json({message: "Welcome"});
 });


const functionRouteUtilizadores = require('./routes/utilizadores.routes.js');
functionRouteUtilizadores(app);


const functionRouteOcorrencias = require('./routes/ocorrencias.routes.js');
functionRouteOcorrencias(app);

const functionRouteAvaliacao = require('./routes/avaliacao.routes.js');
functionRouteAvaliacao(app);


const functionRouteCategoria = require('./routes/categoria.routes.js');
functionRouteCategoria(app);

const functionRouteEstado = require('./routes/estado.routes.js');
functionRouteEstado(app);

const functionRouteFotos = require('./routes/fotos.routes.js');
functionRouteFotos(app);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })


app.post('/profile-upload-single', upload.single('image'), async (req, res) => {
  try {
      console.log(req.file); // File which is uploaded in /uploads folder.
      console.log(req.body); // Body
      res.send({ message: "data recieved" });
    } catch (error) {
      res.status(500).send("Error");
      res.status(200).send({message: error})
    }
  });
  

/*   app.post('/profile-upload-single', upload.single('file'), function (req, res, next) {
      // req.file is the `profile-file` file
      // req.body will hold the text fields, if there were any
      console.log(JSON.stringify(req.file))
      var response = '<a href="/">Home</a><br>'
      response += "Files uploaded successfully.<br>"
      response += `<img src="${req.file.path}" /><br>`
      return res.send(response)
    })
*/

app.post('/profile-upload-multiple', upload.array('image', 12), async (req, res) => {
  try {
    console.log(req.file); // File which is uploaded in /uploads folder.
    console.log(req.body); // Body
    res.send({ message: "data recieved" });
  } catch (error) {
    res.status(500).send("Error");
    res.status(200).send({message: error})
  }
})



 app.listen(8080, () =>{
  console.log('Server is running on port 8080' );
 });