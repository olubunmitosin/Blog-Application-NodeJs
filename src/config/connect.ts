import { connect } from 'mongoose';
import DatabaseConfig from '../config/database';

const env = process.env.NODE_ENV || 'development';
const config = DatabaseConfig[env];

const dbConnect = async () => {
  try {
    if (config.database.url) {
        connect(config.database.url);
      } else if (config.database.config.dbName) {
        connect(`${config.database.protocol}://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}`, {});
      } else {
        connect(`${config.database.protocol}://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`, {});
      }
    console.log('Database connected');
  } catch (error) {
    console.log('Could not connect to db', error);
    process.exit(1);
  }
};

export default dbConnect;