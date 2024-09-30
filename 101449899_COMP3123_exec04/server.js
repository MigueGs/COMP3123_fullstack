const express = require('express');
const app = express();
const port = 3000;

// Ruta GET para /hello
app.get('/hello', (req, res) => {
  res.send('Hello Express JS');
});

// Ruta GET para /user con parámetros query
app.get('/user', (req, res) => {
  const firstname = req.query.firstname || 'Miguel';
  const lastname = req.query.lastname || 'Gutierrez';
  res.json({ firstname, lastname });
});

// Ruta POST para /user con parámetros en el path
app.post('/user/:firstname/:lastname', (req, res) => {
  const { firstname, lastname } = req.params;
  res.json({ firstname, lastname });
});

app.listen(port, () => {
  console.log(`Servidor is running on  http://localhost:${port}`);
});
