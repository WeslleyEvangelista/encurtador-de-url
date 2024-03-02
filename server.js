const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 3000;

// Database
const { sequelize } = require('./models/url');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);

// Start server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
