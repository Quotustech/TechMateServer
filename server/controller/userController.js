const User = require('../model/userModel')


const createUser = async (req, res) =>{
    try{
        const { name, email, role,  password } = req.body;
        const newUser = new User({ name, email, password , role});
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
        
    }
    catch (error) {
        res.status(400).json({ error: error.message });

    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      console.log("user id----------",userId)
      const { name, email, password } = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, { name, email, password }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Delete a user
const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

    // Get a specific user
const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      console.log(userId)
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Get all users
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers
}