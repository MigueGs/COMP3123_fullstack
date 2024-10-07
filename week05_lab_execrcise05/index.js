const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const router = express.Router();

// Middleware to parse JSON body requests
app.use(express.json());

// Ruta /home para servir el archivo home.html
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html')); // Asegúrate de tener el archivo home.html
});

// Ruta /profile para devolver el contenido del archivo user.json en formato JSON
router.get('/profile', (req, res) => {
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Error al leer el archivo de usuario' });
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// Ruta /login para verificar username y password
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Error al leer el archivo de usuario' });
      return;
    }

    const user = JSON.parse(data);
    
    if (user.username === username) {
      if (user.password === password) {
        res.send({ status: true, message: 'User Is valid' });
      } else {
        res.send({ status: false, message: 'Password is invalid' });
      }
    } else {
      res.send({ status: false, message: 'User Name is invalid' });
    }
  });
});

// Ruta /logout para aceptar un username y mostrar un mensaje HTML
router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logout.</b>`);
});

// Middleware para manejar errores y retornar mensaje de error
app.use((err, req, res, next) => {
  res.status(500).send('Server Error');
});

app.use('/', router);

app.listen(process.env.port || 3031, () => {
  console.log('Web Server is listening at port ' + (process.env.port || 3031));
});
