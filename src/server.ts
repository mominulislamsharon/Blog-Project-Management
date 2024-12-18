import mongoose from 'mongoose'
import config from './config';
import app from './app';


async function server() {
  try {
    await mongoose.connect(config.database_url as string)

    // server running on
    app.listen(config.port, () => {
      console.log(`Blog Is Running ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

server();