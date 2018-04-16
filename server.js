const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`

    console.log()
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintanence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// app.get('/', (req, res) => {
//     // res.send('<h1>Hello Express!</h1>');
//     res.send({
//         name: 'Tomer',
//         likes: [
//             'Biking',
//             'Cities'
//         ]
//     });
// });

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/portfolio', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Portfolio',
    });
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Homepage',
        welcomeMessage: 'Hi there',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Couldn\'t something'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});