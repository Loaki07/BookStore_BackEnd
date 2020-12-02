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
}

export default UserService;
