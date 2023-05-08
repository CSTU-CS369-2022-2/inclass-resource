// file: /config/dbConfig.js 
let dbURI = "mongodb://127.0.0.1:27017/myDB";
if (process.env.NODE_ENV === "production") {
  dbURI = process.env.MONGO_URI? process.env.MONGO_URI: dbURI; // production DB server
}

export const config = {
  database: dbURI,
  userMongoClient: true,
  connectOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  mongoDebug: true,
};
