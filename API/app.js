import express from 'express';
import bodyParser from 'body-parser';




const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send('API is working');
});


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});