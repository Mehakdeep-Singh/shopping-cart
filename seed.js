const mongoose = require("mongoose");
const shortId = require("shortid");
const Product = require('./models/product')
const keys = require('./config/keys')

// should add in env
my_mongo_address = keys.mongoURI

mongoose.connect(my_mongo_address,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true,
},
(err) => {
    if(err) console.log(err) 
    else console.log("mongdb is connected");
   })

const seedProducts = [
    {
        title: "Premium Shirt",
        description: "Premium branded shirt. All colors available. COD available",
        image: "/images/shirt1.jpeg",
        price: 1,
        availableSizes: ["L","M","S","XL"]

    },
    {
        title: "Premium T-Shirt",
        description: "Premium branded t-shirt. All colors available. COD available",
        image: "/images/tshirt1.jpeg",
        price: 2,
        availableSizes: ["L","M","S","XL"]

    },
    {
        title: "Premium Hoodie",
        description: "Premium branded hoodie. All colors available. COD available",
        image: "/images/hoodie1.jpeg",
        price: 3,
        availableSizes: ["L","M","S","XL"]

    },
]   

const seedDb = async () => {
    await Product.deleteMany({})
    await Product.insertMany(seedProducts)
}


seedDb().then(() => {
    mongoose.connection.close();
})