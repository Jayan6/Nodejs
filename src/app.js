const express = require('express');
const { adminAuth } = require('./middleware/auth');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

connectDB().then(() => {
  console.log('Connected to MongoDB');
 }).catch((err) => {
  console.error('Error connecting to MongoDB', err);
 })

// app.use('/user', (req, res, next) => {
//   res.send('User route');
//   next();
// },  (req, res) => {
//   res.send('User route 2');
// });
app.use(express.json());

app.post('/signup', async (req, res) => {
const user = new User(req.body);
  await user.save();
  res.send('User created successfully');

// try {
//   await user.save();
//   res.status(201).send('User created successfully');
// } catch (error) {
//   res.status(400).send('Error creating user');
// }
});


app.get('/user', async (req, res) => {
  const userEmail = req.body.email;
console.log('User email:', userEmail);
  try {
    const user = await User.findOne({ email: userEmail });

    if(!user) {
      return res.status(404).send('User not found');
    }
    else {            res.send(user)

    }
  } catch (error) {
    res.status(400).send('Something went wrong');
  } 
});

app.patch('/user', async (req, res) => {
  const userId = req.body.userId;
    const data = req.body;


  try {
    const user = await User.findOneAndUpdate({ _id: userId }, data,{
        returnDocument: 'after',
        runValidators: true,
    });
    

    if(!user) {
      return res.status(404).send('User not found');
    }
    else {      
        res.send('user updated successfully')
    }
  } catch (error) {
    res.status(400).send('Something went wrong');
  } 
});

app.delete('/user', async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findOneAndDelete( userId );

    if(!user) {
      return res.status(404).send('User not found');
    }
    else {      
        res.send('User deleted successfully')
    }
  } catch (error) {
    res.status(400).send('Something went wrong');
  } 
});

app.get('/feed', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
});
app.use('/admin', adminAuth);
app.listen(8000, () => {
  console.log('Server is running on port 3000');
})