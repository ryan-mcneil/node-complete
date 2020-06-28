const path = require('path');
const config = require('./config')

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5ef176f37a3901b12489d4db')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoose.connect(`mongodb+srv://node_complete:${config.mongo_password}@cluster0-jcupc.mongodb.net/shop?retryWrites=true&w=majority`)
  .then( () => {
    User.findOne().then(user => {
      if (!user) {
        user = new User({
          name: 'Ryan',
          email: 'ryan@gmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    })
    app.listen(3000);
  })
  .catch( err => { console.log(err) })


