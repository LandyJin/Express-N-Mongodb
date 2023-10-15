const mongoose = require('mongoose');

mongoose
.connect('mongodb+srv://huiyanj91:12345@cluster0.bah5gef.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('Connect to Mogodb!')
}).catch(err => {
    console.log(err)
})