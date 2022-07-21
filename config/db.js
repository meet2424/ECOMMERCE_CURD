import mongoose from 'mongoose';
const { connect } = mongoose;

const connectDB = async () => {
  try {
    // mongodb+srv://meet:<password>@cluster0.uy3wg.mongodb.net/?retryWrites=true&w=majority
    const conn = await connect(
      'mongodb+srv://meet:curd123@cluster0.uy3wg.mongodb.net/ecommerce_curd?retryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    console.log('MongoDB Connected Successfull');
  } catch (error) {
    console.error(`Mongo DB Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

export default connectDB;
