import mongoose from 'mongoose';
const { Schema } = mongoose;

const storeSchema = new Schema({
  author: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
});

const Store = mongoose.model('Store', storeSchema);

class StoreModel {
  create = (data) => {
    const { author, title, image, quantity, price, description } = data;
    return Store.create({
      author,
      title,
      image,
      quantity,
      price,
      description,
    });
  };

  findAll = () => {
    return Store.find();
  };

  findById = (id) => {
    return Store.findById(id);
  };

  findOne = (fields) => {
    return Store.findOne(fields);
  };

  findMultiple = (fields) => {
    return Store.find(fields);
  };

  updateStore = (id, updatedStoreObject) => {
    return User.findOneAndUpdate(
      id,
      {
        $set: updatedStoreObject,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
  };
}

export { StoreModel, Store };
