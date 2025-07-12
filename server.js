const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Token fijo (puedes cambiarlo)
const VALID_TOKEN = 'abc123';

app.use(express.static('public'));

app.get('/secureloader', (req, res) => {
    const userAgent = req.get('User-Agent');
    const token = req.query.token;

    // Verificar User-Agent y token
    if (userAgent && userAgent.includes('Roblox') && token === VALID_TOKEN) {
        res.set('Content-Type', 'text/plain');
        res.send('loadstring(game:HttpGet("https://raw.githubusercontent.com/rdx222f/Scripts/refs/heads/main/StealABrainrot.lua"))()');
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
