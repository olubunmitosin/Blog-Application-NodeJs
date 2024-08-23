import dotenv from "dotenv";
dotenv.config();

const DatabaseConfig: any = {
  "development": {
    "database": {
      "url": process.env.DATABASE_URL,
    }
  },
  "test": {
    "database": {
      "url": process.env.TEST_DATABASE_URL,
    }
  },
  "production": {
    "database": {
      "protocol": "mongodb",
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "name": process.env.DB_NAME,
      "host": process.env.DB_HOSTNAME,
      "port": "",
    }
  }
}

export default DatabaseConfig;
