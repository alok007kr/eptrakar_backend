const mongoose = require('mongoose')

//creating news schema
const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  urlToImage: {
    type: String,
    required: true
  },
  publishedAt: {
    type: String,
    default: new Date().toJSON().slice(0, 10)
  }
});


//creating model
const Article = mongoose.model("Article", articleSchema);

module.exports = Article
