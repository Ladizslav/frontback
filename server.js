const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Připojení k MongoDB (změň URI podle potřeby)
mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
});
const Post = mongoose.model('Post', PostSchema);

// Endpoint pro získání příspěvků
app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

// Endpoint pro přidání příspěvku
app.post('/posts', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
});

app.listen(3000, () => console.log('Server běží na portu 3000'));
