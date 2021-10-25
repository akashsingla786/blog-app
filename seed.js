const Blog=require('./models/blog');
const { v4: uuid } = require('uuid');
const blogs = [
    {
       id:uuid(),
        name: 'Max',
        desc:'this is my firsr blog'
    },
    {
        id:uuid(),
        name: 'Rock',
        desc:'This is rocks blog'
    },
    {
        id:uuid(),
        name: 'John',
        desc:'you can see me'
    },
]


const seedDB = async () => {
    
    await Blog.deleteMany({});
    await Blog.insertMany(blogs);
    console.log('DB Seeded');
}

module.exports = seedDB;
