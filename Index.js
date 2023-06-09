const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'publicacion_de_blog'
});

connection.connect((error) => {
  if (error) {
    console.log('Error al conectarse a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Leer todos los registros
app.get('/publicacion_de_blog', (req, res) => {
    connection.query('SELECT * FROM publicacion_de_blog', (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  });

  // Leer un registro por ID
app.get('/publicacion_de_blog/:id', (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM publicacion_de_blog WHERE id=${id}`, (error, results) => {
      if (error) throw error;
      res.send(results[0]);
    });
  });

// Crear un nuevo registro
app.post('/publicacion_de_blog', (req, res) => {
    const { titulo, contenido,autor,categoria,fecha} = req.body;
    connection.query(`INSERT INTO publicacion_de_blog (titulo, contenido,autor,categoria,fecha) VALUES ('${titulo}', '${contenido}', '${autor}', '${categoria}', '${fecha}')`, (error, results) => {
      if (error) throw error;
      res.send('Registro creado exitosamente');
    });
  });

    // Actualizar un registro existente
app.put('/publicacion_de_blog/:id', (req, res) => {
    const { id } = req.params;
    const {titulo, contenido,autor,categoria,fecha } = req.body;
    connection.query(`UPDATE publicacion_de_blog SET titulo='${titulo}',contenido='${contenido}',autor='${autor}',categoria='${categoria}', fecha='${fecha}' WHERE id=${id}`, (error, results) => {
      if (error) throw error;
      res.send('Registro actualizado exitosamente');
    });
  });



app.listen(3000, () => {
    console.log('API escuchando en el puerto 3000');
  });