const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    id:{
        type:Number
    },
    name: {
        type: String,
        trim: true,
      
    },
    desc: {
        type: String,
        trim:true
    }
});


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;