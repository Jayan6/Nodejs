const express = require('express');



const app = express();


app.use('/user', (req, res, next) => {
  res.send('User route');
  next();
},  (req, res) => {
  res.send('User route 2');
});

app.listen(8000, () => {
  console.log('Server is running on port 3000');
})