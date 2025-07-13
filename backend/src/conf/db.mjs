import mongoose from 'mongoose'

const mongodb = async () =>{
    try{
      await mongoose.connect('mongodb://nassar:n2001@localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
    }
    catch{
    console.error('MongoDB Connection Error:', err);
    }
}

export default mongodb