const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes'); // Asegúrate de que la ruta sea correcta

const DB_URL = "mongodb+srv://miguelgutiserrano:Carmenrosa1122%2B@cluster0.hhfnq.mongodb.net/week_06_lab?retryWrites=true&w=majority";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Usar las rutas de notas
app.use('/notes', noteRoutes);// Asegúrate de que esta línea esté presente

mongoose.Promise = global.Promise;

// Conectar a la base de datos
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

app.listen(8085, () => {
    console.log("Server is listening on port 8085");
});

