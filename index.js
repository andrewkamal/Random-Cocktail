import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const link = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/random', async (req, res) => {
    try {
    const result = await axios.get(link);
    console.log(result.data.drinks[0]);
    res.render('index.ejs', { drink: result.data.drinks[0]});
    } catch (error) {
        console.log(error.data);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
