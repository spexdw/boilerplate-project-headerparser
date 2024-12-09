const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from public directory
app.use(express.static('public'));

// Root endpoint serves index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Whoami endpoint
app.get('/api/whoami', (req, res) => {
  // Get IP address
  const ipaddress = req.ip || 
                    req.headers['x-forwarded-for'] || 
                    req.connection.remoteAddress;

  // Get preferred language
  const language = req.headers['accept-language'];

  // Get software (user agent)
  const software = req.headers['user-agent'];

  // Return JSON response
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
