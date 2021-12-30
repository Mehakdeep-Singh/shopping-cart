const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortId = require("shortid");
var cors = require('cors')

// import bodyParser from 'body-parser';
const path = require('path');

// const __dirname = path.resolve(path.dirname(''));
// console.log(__dirname)

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection_url= `mongodb+srv://admin:adLlFKyAdfZP4jNf@cluster0.zh9e0.mongodb.net/cart?retryWrites=true&w=majority`


// mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const Product = mongoose.model("products", new mongoose.Schema({
    _id: { type: String, default: shortId.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
}));

app.get("/api/products", async (req, res) => {
    console.log("get prod rqst . ..before")
    const products = await Product.find({});
    console.log("get prod rqst . ..")
    res.send(products);
})

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    res.send(saveProduct)
})

app.delete("/api/products/:id", async (req, res) => {
    // const deleteProduct = await Product.findById(req.param.id);
    const deleteProduct = await Product.deleteMany({ price: "12" });
    res.send(deleteProduct);
})

const Order = mongoose.model("order", new mongoose.Schema({
    _id: {
        type: String,
        default: shortId.generate
    },
    email:String,
    name:String,
    address:String,
    total:Number,
    cartItems:[{
        _id:String,
        title:String,
        price:Number,
        count:Number
    }]
    
},{
    timestamps:true
}
));
app.post("/api/orders",async(req,res) => {
    console.log("order made",req.body);
    if(!req.body.name ||
       !req.body.email || 
       !req.body.address || 
       !req.body.total || 
       !req.body.cartItems 
        ){
            res.send({message:"Data is required"});
        }
        const order = await Order(req.body).save();
        res.send(order);
})

if(process.env.NODE_ENV === 'production'){
    
        // app.use(express.static('whatsapp-mern/build'))
    
        app.use(express.static(path.join(__dirname, 'build')));
      // Handle React routing, return all requests to React app
      app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
      });
    
}

// app.use(express.static(path.join(__dirname, 'build')));
// // Handle React routing, return all requests to React app
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


const port = process.env.PORT || 4000;
app.listen(port, () => console.log("running on port ",port))