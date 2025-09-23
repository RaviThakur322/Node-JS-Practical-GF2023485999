// 1. Import Mongoose
const mongoose = require('mongoose');

// 2. Define the MongoDB connection URI
// Replace 'mydatabase' with the name of your database.
// It will be created automatically if it doesn't exist.
const dbURI = 'mongodb://127.0.0.1:27017/mydatabase';

// 3. Define a Schema for the User
// A schema maps to a MongoDB collection and defines the shape of the documents.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures no two users have the same email
    },
    age: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// 4. Create a Model from the Schema
// A model is a class with which we construct documents.
const User = mongoose.model('User', userSchema);

// 5. Create the main function to connect and insert data
async function main() {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(dbURI);
        console.log('✅ Successfully connected to MongoDB!');

        // Create a new user instance
        const newUser = new User({
            name: 'Ravi Kumar',
            email: 'ravi.thakur32212@gmail.com',
            age: 30
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        console.log('💾 User saved successfully:', savedUser);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        // Disconnect from the database
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB.');
    }
}

// Run the main function
main();