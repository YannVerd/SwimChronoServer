import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PW}@SwimChronoDB:27017/${process.env.DB_NAME}?authSource=admin`)
    .then(async () => {
        try {
            // Sync mongo indexes if needed
            // (Remove indexes that have been remove from schema)
            const User = mongoose.model('User');
          } catch (err) {
            console.error('index update err : ', err);
          }
      
          console.error('MongoDB connection succeed!');
        
    }).catch((error) => {
        console.error(`Error connecting to mongoDB: ${error}`);
    });