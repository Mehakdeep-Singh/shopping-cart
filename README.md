## Features

- Featured shopping cart
- Admin view and access to add and delete new items with images
- Top products carousel
- Product filtering options
- Register and Login page (using JWT)
- Database seeder (products)


### Env Variables

Create a .env file in then root and add the following

```
MONGO_URI: your mongo uri
SECRETORKEY: secret
PORT= 4000
```

### Install Dependencies (frontend & backend)

```
yarn install
```

### Run on Local

```
# Run frontend (:3000) 
npm start

# Run backend (:4000)
node server.js
```


### Seed Database

You can use the following commands to seed the database with some sample products as well as reset all products

```
# Seed Products
node seed.js

# To add users
Use the route '/register' and then it automatically routes you to '/login', just enter the credentials and you will be routed to '/app'
```

```
Sample User Registrations you can use

admin@example.com 
123456

```

# Note

It was just a fun project and is not a full working shopping cart. Contains missing functionality like ->
- Contains comments, no functionality properly added to protect routes .
- No tests added, have some known bugs and UI is not properly designed to make it live.


