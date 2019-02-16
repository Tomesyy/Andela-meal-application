import express from 'express';


const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    return res.send('API is working');
});


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});