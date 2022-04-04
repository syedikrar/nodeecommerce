const mongoose = require('mongoose');

const databaseConnection = () => {
    mongoose.connect('mongodb+srv://ikrar:ikrar123_@cluster0.zg175.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
        {useNewUrlParser: true, useUnifiedTopology:true}
    ).then((e) => {
        console.log(`your database connection is going good ${e}`);
    })
}

module.exports = databaseConnection