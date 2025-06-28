require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para recibir el formulario de contacto
app.post('/api/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Configura el transporte de correo
 const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

  // Opciones del correo
  const mailOptions = {
    from: `"${nombre}" <${email}>`,
    to: process.env.MAIL_TO,
    subject: `Nuevo mensaje de contacto de ${nombre}`,
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
  };

   try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error); // <-- Agrega esto
    res.status(500).json({ msg: 'Error al enviar el mensaje', error: error.message });
  }
});

// Inicia el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});