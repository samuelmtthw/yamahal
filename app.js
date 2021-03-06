const express = require('express');
const app = express();
const PORT = 3000;
// const PORT = process.env.PORT;
const routes = require('./routes');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
	})
);

app.use('/', routes);

app.listen(PORT, () => {
	console.log('Running');
});
