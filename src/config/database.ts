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
      "url": process.env.DATABASE_URL,
    }
  }
}

export default DatabaseConfig;
