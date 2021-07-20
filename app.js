
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');




const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));




mongoose.connect("mongodb://localhost:27017/wikiDB",{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const articleSchema = {
  title:String,
  content:String
};
const Article = mongoose.model("Article",articleSchema);

///////////////////////////////////////Requests targeting all articles///////////////////////////

app.route("/articles")
.get(function(req,res){
  Article.find(function(err,foundArticles){
    if(!err){
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
})

.post(function(req,res){
  const newArticle = new article({
    title: req.body.title,
    content: req.body.
  });
  newArticle.save(function(err){
      if(!err){
        res.send("Successfuly added new aritcle");
      } else {
        res.send(err);
      }
  });
})

.delete(function(req,res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Successfully deleted all the articles");
    } else {
      res.send(er);
    }
  });
});



///////////////////////////////////////Requests targeting specific articles///////////////////////////

app.route('/articles/:articleTitle')

.get(function(req,res){
  Article.findOne({title: req.params.articleTitle} , function(err,foundArticle){
      if(foundArticle){
        res.send(foundArticle);
      } else {
        res.send("No article matching that item was found");
      }
  });
})
.put(function(req,res){
  Article.update(
    { title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Successfully updated article");
      }
    }
);
})

.patch(function(req,res{
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully updated articles");
      } else {
        res.send(err);
      }
    }
  )
})

.delete(function(req,res){
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err){
      if(!err){
        res.send("Successfuly deleted the specific item");
      } else {
        res.send(err);
      }
    }
  );
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
