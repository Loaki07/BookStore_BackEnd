import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema({
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

const Book = mongoose.model('Book', bookSchema);

class BookModel {
  create = (data) => {
    const { author, title, image, quantity, price, description } = data;
    return Book.create({
      author,
      title,
      image,
      quantity,
      price,
      description,
    });
  };

  findAll = () => {
    return Book.find();
  };

  findAllPagination = (pageSize, page) => {
    return Book.find()
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  };

  findById = (id) => {
    return Book.findById(id);
  };

  findOne = (fields) => {
    return Book.findOne(fields);
  };

  findMultiple = (fields) => {
    return Book.find(fields);
  };

  updateBook = (id, updatedBookObject) => {
    return Book.findOneAndUpdate(
      id,
      {
        $set: updatedBookObject,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
  };

  count = () => Book.countDocuments();
}

export default BookModel;
