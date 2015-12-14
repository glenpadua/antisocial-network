// Configurations for the App

module.exports = {
	'port': process.env.PORT || 8080, // Port for the app to run
	'database': 'mongodb://localhost:27017/anti-social', // URL for database connection
	'secret': 'yomamaissofat' // Secret key for token creation
};