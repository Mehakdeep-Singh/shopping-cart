const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortId = require("shortid");
var cors = require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/react-shopping-cart-db",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

const Product = mongoose.model("products",new mongoose.Schema({
    _id:{type:String,default: shortId.generate},
    title:String,
    description:String,
    image:String,
    price:Number,
    availableSizes:[String],
}));

app.get("/api/products",async(req,res) => {
    const products = await Product.find({});
    console.log("get prod rqst . ..")
    res.send(products);
})

app.post("/api/products",async(req,res) => {
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save(); 
    res.send(saveProduct)
})

app.delete("/api/products/:id",async (req,res) => {
    // const deleteProduct = await Product.findById(req.param.id);
    const deleteProduct = await Product.deleteMany({price:"12"});
    res.send(deleteProduct);
})

const port = process.env.PORT || 4000;
app.listen(port,() => console.log("running on port 4000"))