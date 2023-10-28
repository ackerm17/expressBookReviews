const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios")



public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop

    

axios.get('/').then(resp => {
    res.send(JSON.stringify(books,null,4));
    
});

// Get book details based on ISBN
axios.get('/isbn/:isbn').then(resp => {
        const isbn = req.params.isbn;
        res.send(books[isbn])
 });
  
// Get book details based on author
axios.get('/author/:author').then(resp => {
        const author = req.params.author;
        for(let i = 1; i<=10; i++){
            if(author == books[i].author){
                res.send(books[i])
            }
    })
});

// Get all books based on title
axios.get('/title/:title').then(resp => {
        const title = req.params.title;
        for(let i = 1; i<=10; i++){
            if(title == books[i].title){
                res.send(books[i])
            }
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;

