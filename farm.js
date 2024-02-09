const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relation_db')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
    }]
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Grapefruit', price: 1.99, season: 'Summer' },
//     { name: 'Lemon', price: 0.99, season: 'Winter' },
//     { name: 'Apple', price: 1.49, season: 'Fall' },
//     { name: 'Orange', price: 1.29, season: 'Spring' }
// ]).then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

// const makeFarm = async () => {
//     const farm = new Farm({
//         name: 'Full Belly Farms',
//         city: 'Guinda, CA' 
//     });
//     const apple = await Product.findOne({ name: 'Apple' });
//     farm.products.push(apple);
//     const result = await farm.save();
//     console.log(result);
// }

// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms' });
    const orange = await Product.findOne({ name: 'Orange' });
    farm.products.push(orange);
    const result = await farm.save();
    console.log(result);
}

addProduct();