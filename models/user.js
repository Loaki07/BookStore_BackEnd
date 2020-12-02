import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      minlength: [3, 'A Minimum if 3 characters is required'],
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      minlength: [6, 'A Minimum of 6 characters is required'],
      required: true,
      select: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
  const saltRounds = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltRounds);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

class UserModel {
  createUser = (data) => {
    const { fullName, emailId, password, mobileNumber, isEmailVerified } = data;
    return User.create({
      fullName,
      emailId,
      password,
      mobileNumber,
      isEmailVerified,
    });
  };

  getAllUsers = () => {
    return User.find();
  };

  getProtectedUser = (id) => {
    return User.findById(id);
  };

  findOne = (fields) => {
    return User.findOne(fields);
  };

  saveUser = (user) => {
    return user.save;
  };

  updateUser = (id, updatedUserObject) => {
    return User.findOneAndUpdate(
      id,
      {
        $set: updatedUserObject,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
  };

  saveUserWithoutValidation = (user) => {
    return user.save({ validateBeforeSave: false });
  };

  findMultipleUsers = (fields) => {
    return User.find(fields);
  };
}

export { UserModel, User };
