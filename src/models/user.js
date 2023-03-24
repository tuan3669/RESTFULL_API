const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
  },
  { timestamps: true }
);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = bcrypt.genSaltSync(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods = {
  comparePassword: async function (password) {
    try {
      console.log(password);
      const match = await bcrypt.compare(password, this.password);
      return match;
    } catch (error) {
      console.log(error);
    }
  },
};
//Export the model
module.exports = mongoose.model('User', userSchema);
