//requireing all the packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Article = require("./Model/article.js");




//initialising express
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));



//coonecting to db
mongoose.connect("mongodb+srv://admin-alok:alok2021@cluster0.xefkarm.mongodb.net/newsDB");






//searching the article
app.get("/everything", async (req, res) => {

const date = new Date();

  let data;

  if (req.query.author) {
    data = await Article.find({
      "$or": [{
        author: {
          $regex: req.query.author
        }
      }]
    });
  }

  if (req.query.from) {
    data = await Article.find({
      "$and": [{

        author: {
          $regex: req.query.author
        },
         publishedAt:{$gte:req.query.from,$lt:date}

      }]
    });
  }

  if (req.query.from&&req.query.to) {
    data = await Article.find({
      "$and": [{

        author: {
          $regex: req.query.author
        },
         publishedAt:{$gte:req.query.from,$lt:req.query.to}

      }]
    });
  }
  
    if(req.query.category){
    //console.log(req.query.category)
    data = await Article.find({
      "$or": [{
        category: {
          $regex: req.query.category
        }
      }]
    });
  }

  if(req.query.tag){
    data = await Article.find({
      "$or": [{
        tags: {
          $regex: req.query.tag
        }
      }]
    });
  }

  if(req.query.keyword){
    data = await Article.find({
      "$or": [{
        keywords: {
          $regex: req.query.keyword
        }
      }]
    });
  }


  res.send(data);
});






//searching top headlines
app.get("/top-headlines", async (req, res) => {
  let data;
  if (req.query.title) {

    data = await Article.find({
      "$or": [{
        title: {
          $regex: req.query.title
        },

      }]
    });

  }




  if (req.query.country) {
    data = await Article.find({
      "$and": [{
        content: {
          $regex: req.query.country
        },
        title: {
          $regex: req.query.title
        }

      }]
    });
  }
  res.send(data);
});





//posting to articles
app.post('/articles', (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    urlToImage: req.body.urlToImage,
    publishedAt: req.body.publishedAt,
    category: req.body.category,
    tags: req.body.tags,
    keywords: req.body.keywords
  });
  newArticle.save((err) => {
    if (!err) {
      res.send("Successfully saved to DB");
    } else {
      res.send(err);
    }
  });

})









//starting server
app.listen(3000, function() {
  console.log("Server Started........");
});
