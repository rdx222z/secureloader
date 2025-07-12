const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Token fijo (cámbialo si quieres)
const VALID_TOKEN = 'abc123';

// Servir archivos estáticos desde la raíz
app.use(express.static('.'));

app.get('/secureloader', (req, res) => {
    const userAgent = req.headers['user-agent'];
    const token = req.query.token;

    // Verificar User-Agent y token
    if (userAgent && userAgent.includes('Roblox') && token === VALID_TOKEN) {
        res.set('Content-Type', 'text/plain');
        res.send('loadstring(game:HttpGet("https://raw.githubusercontent.com/rdx222f/Scripts/refs/heads/main/StealABrainrot.lua"))()');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

// Exportar como función serverless para Netlify
module.exports.handler = serverless(app);
