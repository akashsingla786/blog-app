if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const mongoose =require('mongoose');
const seed=require('./seed');
const Blog=require('./models/blog');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));


// seed();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))




app.get('/', (req, res) => {
    res.render('home');
});



app.get('/blogs', async(req, res) => {
    const blogs=await Blog.find({});
    res.render('index', { blogs });
});


app.get('/blogs/new', (req, res) => {
    
    res.render('new');
});



app.post('/blogs', async(req, res) => {
    
    const newblog = {
        
        ...req.body
    }

    
    await Blog.create(newblog);

    res.redirect('/blogs');
});

app.get('/blogs/:id', async(req, res) => {
   
    const { id } = req.params;
    
    const foundblog = await Blog.findById(id);
console.log(foundblog);
    
    res.render('show', {foundblog });
});


app.get('/blogs/:id/edit',async (req, res) => {
    
    const { id } = req.params;

    const foundblog = await Blog.findById(id);

    res.render('edit', { foundblog });
});


app.patch('/blogs/:id', async(req, res) => {
   
    const { id } = req.params;

    const updatedblog = req.body;

    console.log(updatedblog)
    await Blog.findById(id,{desc:'updatedblog'});


    res.redirect('/blogs');
});


app.delete('/blogs/:id', async (req, res) => {
    
    const { id } = req.params;

   await Blog.findByIdAndDelete(id);

    res.redirect('/blogs');
});

app.listen( process.env.PORT ||  2323, () => {
    console.log('server runnig at port 2323');
})