const express = require('express');



const app = express();


app.use("/ss", (req , res) => {
  res.send( 'Not Found' );
}  );



app.listen(3000, () => {
  console.log('Server is running on port 3000');
})