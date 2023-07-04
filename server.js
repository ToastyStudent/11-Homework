const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// This file is necessary to establish the connection to the server so that this application can be viewed in the browser.

// Initialize the application with express and create a server port to host it
const app = express();
const PORT = process.env.PORT || 3001;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start the server on the selected port
app.listen(PORT, () => console.log(`Now Listening at http://localhost:${PORT}`));
