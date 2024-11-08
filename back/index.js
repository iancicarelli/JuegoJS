const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;
const path = require('path');

app.use(cors({
  origin: 'http://localhost:8080' 
}));

app.use(express.json());

// REGISTRO
app.post('/register', (req, res) => {
  console.log(req.body);
  const { playerName, playerEmail } = req.body;
  if (!playerName || !playerEmail) {
    return res.status(400).json({ message: 'Nombre y correo son requeridos.' });
  }

  const dataFilePath = path.join(__dirname, 'data', 'usuario.json');
  let users = [];

  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      if (fileData) {
        users = JSON.parse(fileData);
      }
    }

    const newUser = { playerName, playerEmail };
    users.push(newUser);

    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf8');

    res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
// ENVIAR EL REGISTRO A ChooseCharacter
app.get('/players', (req, res) => {
  const dataFilePath = path.join(__dirname, 'data', 'usuario.json');
  
  try {
    let users = [];
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      if (fileData) {
        users = JSON.parse(fileData);
      }
    }
    
    if (users.length > 0) {
      // envia el último jugador
      const lastPlayer = users[users.length - 1].playerName;
      res.status(200).json({ playerName: lastPlayer });
    } else {
      res.status(404).json({ message: 'No players found' });
    }
  } catch (error) {
    console.error('Error al leer el archivo de usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});




app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});