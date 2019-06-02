const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const carRoutes = express.Router();
const port = 3000;

let Car = require('./model/car');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/tot', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongooDB Connected");
});

//adding cars
carRoutes.route('/add').post(function(req,res){
    let cars = new Car(req.body);
    cars.save()
        .then(cars => {
            res.status(200).send('car added')
        })
        .catch(err =>{
            res.status(404).send('Adding Failed')
        });
});

//fetch Cars

carRoutes.route('/').get(function(req,res){
    Car.find(function(err,cars){
        if(err){
            console.log(err);
        }
        else{
            res.json(cars);
        }
    });
});

//fetch by id

carRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Car.findById(id,function(err,cars){
        if(err){
            console.log(err)
        }
        else{
            res.json(cars)
        }
    })
})

//update

carRoutes.route('/update/:id').post(function(req,res){
    Car.findById(req.params.id,function(err,cars){
        if(!cars){
            res.status(404).send('No data')
        }
        else{
            cars.name = req.body.name;
            cars.price = req.body.price;
            cars.wheel = req.body.wheel;

            cars.save().then(cars => {
                res.json('Updated')
            })
            .catch(err =>{
                res.status(400).send('Not Updated Error!')
            })
        }
    })
})


app.use('/car', carRoutes);


app.listen(port, () => console.log(`app listening on port ${port}!`))