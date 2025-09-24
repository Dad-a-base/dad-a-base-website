import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dadabase';

mongoose
  .connect(URI)
  .then(() => {
    console.log('Succesfully connected to the database');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

const jokeSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Joke must have text field'],
  },
  source: {
    type: String,
    default: 'Anonymous',
  },
});

const Joke = mongoose.model('Joke', jokeSchema);

export { Joke };
