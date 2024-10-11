const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Set EJS as templating engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// Serve static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        products: [
            {
                title: 'Industrial Containers',
                description: 'High-quality plastic containers for industrial use',
                image: '/images/container.jpg'
            },
            {
                title: 'Household Items',
                description: 'Durable plastic products for everyday use',
                image: '/images/household.jpg'
            },
            {
                title: 'Custom Solutions',
                description: 'Tailored plastic products for specific needs',
                image: '/images/custom.jpg'
            }
        ]
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});