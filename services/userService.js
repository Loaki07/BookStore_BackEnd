import { UserModel } from '../models/user.js';
const {
  createUser,
  getAllUsers,
  getProtectedUser,
  findOne,
  saveUser,
  clearResetFields,
  saveUserWithoutValidation,
  updateUser,
} = new UserModel();

class UserService {
  registerNewUser = (data) => {
    findOne({
      emailId: data.emailId,
    })
      .then((user) => {
        if (user) {
          throw new Error(`User with email '${data.emailId} already exists!'`);
        }
      })
      .catch((error) => error);
    return createUser(data);
  };

  logInByUserName = async (data) => {
    const { emailId, password } = data;

    const foundUser = await findOne({ emailId });
    if (foundUser === null || !foundUser) {
      throw new Error(`User with email ${emailId}, Not Found!`);
    }
    // Check if password matches
    const isMatch = await foundUser.matchPassword(password);
    if (!isMatch) {
      throw new Error(`Incorrect Password`);
    }
    return foundUser;
  };

  updateUserInDb = async (id, updatedUserObject) => {
    return updateUser(id, updatedUserObject);
  };

  findOne = (dataObject) => {
    return findOne(dataObject);
  };
}

export default UserService;
