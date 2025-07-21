const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(__dirname));

// Rota para envio do inquérito
app.post('/api/inquerito', async (req, res) => {
  const data = req.body;
  // Montar corpo do e-mail
  let html = '<h2>Dados do Inquérito</h2><ul>';
  for (const key in data) {
    html += `<li><b>${key}:</b> ${Array.isArray(data[key]) ? data[key].join(', ') : data[key]}</li>`;
  }
  html += '</ul>';

  // Configurar Nodemailer
  let transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: 'contacto@tslparceiros.pt',
      pass: 'Tslparceiros@2025'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    await transporter.sendMail({
      from: 'TSL Parceiros <contacto@tslparceiros.pt>',
      to: 'contacto@tslparceiros.pt',
      subject: 'Novo Inquérito Recebido',
      html
    });
    res.json({ ok: true, message: 'Inquérito enviado com sucesso!' });
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
    res.status(500).json({ ok: false, message: 'Erro ao enviar e-mail.' });
  }
});

// Rota para envio do formulário de contacto
app.post('/api/contacto', async (req, res) => {
  const data = req.body;
  let html = '<h2>Mensagem de Contacto</h2><ul>';
  for (const key in data) {
    html += `<li><b>${key}:</b> ${Array.isArray(data[key]) ? data[key].join(', ') : data[key]}</li>`;
  }
  html += '</ul>';

  let transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: 'contacto@tslparceiros.pt',
      pass: 'Tslparceiros@2025'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    await transporter.sendMail({
      from: 'TSL Parceiros <contacto@tslparceiros.pt>',
      to: 'contacto@tslparceiros.pt',
      subject: 'Novo Contacto Recebido',
      html
    });
    res.json({ ok: true, message: 'Mensagem enviada com sucesso!' });
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
    res.status(500).json({ ok: false, message: 'Erro ao enviar e-mail.' });
  }
});

// Rota para envio da newsletter
app.post('/api/newsletter', async (req, res) => {
  const data = req.body;
  let html = '<h2>Nova inscrição na Newsletter</h2><ul>';
  for (const key in data) {
    html += `<li><b>${key}:</b> ${Array.isArray(data[key]) ? data[key].join(', ') : data[key]}</li>`;
  }
  html += '</ul>';

  let transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: 'contacto@tslparceiros.pt',
      pass: 'Tslparceiros@2025'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    await transporter.sendMail({
      from: 'TSL Parceiros <contacto@tslparceiros.pt>',
      to: 'contacto@tslparceiros.pt',
      subject: 'Nova inscrição na newsletter',
      html
    });
    res.json({ ok: true, message: 'Inscrição enviada com sucesso!' });
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
    res.status(500).json({ ok: false, message: 'Erro ao enviar e-mail.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
}); 