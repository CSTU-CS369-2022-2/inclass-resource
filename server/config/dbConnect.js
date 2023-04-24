import mongoose from 'mongoose'
import { config } from './dbConfig.js'

mongoose.connection.on('connected', () => {
	console.log('MongoDB connected ' + config.database)
})

mongoose.connection.on('reconnected', () => {
	console.log('MongoDB Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
	console.log('MongoDB Connection Disconnected')
})

mongoose.connection.on('close', () => {
	console.log('MongoDB Connection Closed')
})

mongoose.connection.on('error', (error) => {
	console.log('MongoDB ERROR: ' + error)
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
	mongoose.connection.close().then(() => {
		console.log(
			'Disconnected from ' + config.database + ' through app termination'
		)
		process.exit(0)
	})
})

mongoose.set('debug', config.mongoDebug)
const mongooseDbConnect = async ({ database, connectOptions } = config) => {
	await mongoose.connect(database, connectOptions)
}

export default mongooseDbConnect
