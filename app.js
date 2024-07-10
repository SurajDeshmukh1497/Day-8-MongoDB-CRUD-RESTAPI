const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/myDatabase';

mongoose.connect(connectionString, {
  // Remove deprecated options
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Adjust the timeout as needed
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose connection disconnected');
});

// Define a schema for your data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// create user
const createUser = async () => {
  const user = new User({
    name: 'Abhi Deshmukh',
    email: 'abhi@example.com',
    age: 29
  });

  try {
    const savedUser = await user.save();
    console.log('User created:', savedUser);
  } catch (err) {
    console.error('Error creating user:', err);
  }
};

createUser();

// read (find) All user:
const findAllUsers = async () => {
  try {
    const users = await User.find();
    console.log('All users:', users);
  } catch (err) {
    console.error('Error finding users:', err);
  }
};

findAllUsers();

// read(find) user by ID:

const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    console.log('User found:', user);
  } catch (err) {
    console.error('Error finding user:', err);
  }
};

findUserById('668e4eca55b8e7959f29bef8')

// output:
/*
User found: {
  _id: new ObjectId('668e4eca55b8e7959f29bef8'),
  name: 'Suraj Deshmukh',
  email: 'Suraj@example.com',
  age: 30,
  __v: 0
}*/

// update:

const updateUser = async (id) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { age: 35 }, { new: true });
    console.log('User updated:', updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
  }
};

updateUser('668e5217818a01537161937b')

//output:
/*
User updated: {
  _id: new ObjectId('668e5217818a01537161937b'),
  name: 'Rahul Jain',
  email: 'rahul@example.com',
  age: 35,
  __v: 0
}
*/


// delete operation
const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    console.log('User deleted:', deletedUser);
  } catch (err) {
    console.error('Error deleting user:', err);
  }
};

deleteUser('668e446289b00a22330afcf9')

// output:

/*User deleted: {
  _id: new ObjectId('668e446289b00a22330afcf9'),
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 30,
  __v: 0
}*/


