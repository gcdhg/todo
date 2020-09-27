module.exports = (mongoose, config) => {

    const database = mongoose.connection;

    mongoose.connect(String(config), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    database.on('error', error => console.log(`Connection to database failed: ${error}`));
    database.on('connected', () => console.log('Connected to database'));
    database.on('disconnected', () => console.log('Disconnected from database'));

    process.on('SIGINT', () => {
        database.close(() => {
            console.log('ToDo terminated, connection closed');
            process.exit(0);
        })
    });
};
