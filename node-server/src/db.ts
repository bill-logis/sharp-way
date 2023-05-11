import mongoose, { Schema, Document} from "mongoose";


export const connect = (DB_HOST: string) => {
  mongoose.connect(DB_HOST);
  mongoose.connection.on('error', (err: string) => {
    console.error(err);
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running.'
    );
    process.exit();
  });
}

export const close = () => {
  mongoose.connection.close();
}
