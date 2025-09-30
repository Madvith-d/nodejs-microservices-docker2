import express from "express";
import bodyParser from "body-parser";
const PORT = 3000;
const app  = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    