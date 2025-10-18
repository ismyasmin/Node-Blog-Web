const mongoose = require('mongoose');
const Schema = mongoose.Schema; // constructor function to create a new schema

// schema defines structure of the documents that'll be later stored inside a collection 

// mongoose creating a schema & can say what tpye of data each property can be & if it's required or not
// pass in an object as a parameter so this object can describe the structure of the documents that'll store in the collection
const blogSchema = new Schema({  // creates new instance of a schema object
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
},{timestamps: true}); // automatically generates time stamp properties, gonna auto assign properties when new blogs are added


// create model based on the schema
const Blog = mongoose.model('Blog', blogSchema)// model are given with a capital letter
                                    // first argument; define the name of this model which should be the singular of the collection name & store it inside a constant (const Blog)
                                    // second argument is going to be the schema the model will be based on
                                    
model.exports = Blog; // export to be used elsewhere in the project