const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// A simple in-memory "user database" for demonstration
const users = {
    "testuser@contoso.com": "securepassword123",
    "alice@contoso.com": "mySecret"
};

// POST endpoint that receives the credentials
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    console.log(`Attempting login for: ${username}`);
    
    // Server-side authentication logic
    if (users[username] && users[username] === password) {
        // SUCCESS: Credentials are valid on the application's side
        console.log(`Login successful for ${username}`);
        return res.send(`<h1>Welcome, ${username}!</h1><p>Authentication was successful using the credentials automatically filled by Entra ID SSO.</p>`);
    } else {
        // FAILURE: Credentials failed to validate
        console.log(`Login failed for ${username}`);
        // In a real app, you would redirect back to the login page with an error.
        return res.status(401).send('<h1>Authentication Failed</h1><p>Invalid username or password.</p>');
    }
});

// Serve the index.html page (optional, as GitHub Pages will handle this)
// For local testing:
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// You will also need a package.json file:
/*
{
  "name": "legacy-app-server",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.19.2",
    "body-parser": "^1.20.2"
  },
  "scripts": {
    "start": "node server.js"
  }
}
*/
