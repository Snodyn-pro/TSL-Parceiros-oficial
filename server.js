const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    console.log('Requested file:', filePath);

    if (filePath === './') {
        filePath = './index.html';
    }

    if (!fs.existsSync(filePath)) {
        console.log('File does not exist:', filePath);
        res.writeHead(404);
        res.end('File not found');
        return;
    }

    const extname = path.extname(filePath);
    console.log('File extension:', extname);

    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
    }

    console.log('Content-Type:', contentType);

    try {
        const content = fs.readFileSync(filePath);
        console.log('File read successfully:', filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (error) {
        console.log('Error reading file:', error);
        res.writeHead(500);
        res.end('Server error: ' + error.message);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 