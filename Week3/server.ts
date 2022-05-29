import express from 'express';

const app = express(); // create a new express application
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

//listener - similiar to server.listen()
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
