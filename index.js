const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
app.get('/', (req, res) => res.send('Welcome to the new agents site'))
app.listen(port, (err) => {
    if (err) {
      console.log('Error::', err);
    }
    console.log(`agents app listening on port ${port}`);
});