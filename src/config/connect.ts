import { connect } from 'mongoose';
import DatabaseConfig from '../config/database';
import { MongoClient, ServerApiVersion } from 'mongodb';

const env = process.env.NODE_ENV || 'development';
const config = DatabaseConfig[env];

const dbConnect = async () => {
  try {
    if (env === 'development') {
        connect(config.database.url);
      } else if (env === 'testing') {
        connect(`${config.database.protocol}://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}`, {});
      } else {
        const dbClient = new MongoClient(config.database.url, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
        });
        await dbClient.connect();
        await dbClient.db("blog_application");
      }
    console.log('Database connected');
  } catch (error) {
    console.log('Could not connect to db', error);
    process.exit(1);
  }
};

export default dbConnect;