const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relation_db')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const productSchema = new mongoose.Schema({
    name: String,
    addresses: [{
        _id: false,
        street: String,
        city: String,
        country: String
    }]
});

const User = mongoose.model('User', productSchema);
const Address = mongoose.model('Address', productSchema);

const makeUser = async () => {
    const user = new User({
        name: 'Peter Parker',
    })
    user.addresses.push({
        street: 'Queens',
        city: 'New York',
        country: 'USA'
    })
    const result = await user.save();
    console.log(user);
}

makeUser();

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: 'Brooklyn',
        city: 'New York',
        country: 'USA'
    })
    const result = await user.save();
    console.log(result);
}

addAddress('65c67a5188a96ce4f7a4d484');