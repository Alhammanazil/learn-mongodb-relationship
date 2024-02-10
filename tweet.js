const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relation_db')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const userSchema = new mongoose.Schema({
    username: String,
    age: Number,   
});

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     const user = await User.findOne({ 
//         username: 'chickenfan99' 
//     });

//     const tweet1 = new Tweet({ 
//         text: 'why everyone so serious all the time?', 
//         likes: 2 
//     });

//     tweet1.user = user;
//     tweet1.save();
// }

// makeTweets();

const showTweets = async () => {
    const tweet = await Tweet.findById('65c6e2723ccfd048579e5020')
    .populate('user');
    console.log(tweet);
}

showTweets();