const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer')

const Product = require('./models/product')
var cors = require('cors')
const passport = require("passport");
const users = require("./routes/api/users");
const keys = require('./config/keys')

const app = express();
app.use(cors());
// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null, "./public/images")
    },
    filename: (req, file, callback) => {
        console.log("file",file)
        callback(null, file.originalname)
    }
})
  
const upload = multer({storage: storage})

// store in env file
my_mongo_address = keys.mongoURI

mongoose.connect(my_mongo_address,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
},
(err) => {
    if(err) console.log(err) 
    else console.log("mongdb is connected");
   })

app.get("/api/products",async(req,res) => {
    const products = await Product.find({});
    console.log("get prod rqst . ..")
    res.send(products);
})

app.get("/api/products/:id",async (req,res) => {
    const product = await Product.findById(req.params.id);
    console.log(req.params)
    
    res.send(product);
})

app.post("/api/products", upload.single("image"), async(req,res) => {
    console.log("post rqst..")
    let product = req.body
    product.image = "/images/" + req.file?.filename 
    console.log("product image", req.body,  req.file)
    const newProduct = new Product(product);
    const saveProduct = await newProduct.save(); 

    res.send(saveProduct)
})

app.put("/api/products/:id", upload.single("image"), async(req,res) => {
    console.log("updatesdsfdfsdgsfdg")
    let product = req.body
    product.image = "/images/" + req.file?.filename 
    console.log(product)
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product)
    res.send(updatedProduct);
})

app.delete("/api/products/:id",async (req,res) => {
    const deleteProduct = await Product.deleteOne({_id:req.params.id});
    res.send(deleteProduct);
})

const port = process.env.PORT || 4000;
app.listen(port,() => console.log("running on port ",port))
