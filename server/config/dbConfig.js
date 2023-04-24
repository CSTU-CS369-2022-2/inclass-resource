let dbURI = 'mongodb://127.0.0.1:27017/myDB'

if (process.env.NODE_ENV === 'production') {
	// production DB server
	dbURI = process.env.MONGO_URI ? process.env.MONGO_URI : dbURI
}

export const config = {
	database: dbURI,
	userMongoClient: true,
	connectOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	mongoDebug: true,
}

// To setup production and mongo uri env. Use:
// c:\> NODE_ENV=production MONGO_URI=mongodb:// :@:/ nodemon start
