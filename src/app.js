const express = require('express');



const app = express();


app.use("/ss", (req , res) => {
  res.send( 'Not Found' );
}  );

app.get("/user/:userId/:name/:password", (req , res) => {
    console.log(req.params);
  res.send( { firstName: 'Aks' , lastName: 'AKS'} );
}  );



app.listen(3000, () => {
  console.log('Server is running on port 3000');
})