/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
No part of this assignment has been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.

Name: Ashik Ashokan
Student ID: 170349237
Date: 15-02-2025
Vercel Web App URL: 
GitHub Repository URL: https://github.com/ArezSparrow/web322-app.git

********************************************************************************/ 

const express = require('express'); 
const storeService = require("./store-service");
const path = require('path');
const app = express(); 

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

const HTTP_PORT = process.env.PORT || 8080;

  app.get("/", (req, res) => {
    res.redirect("/about");
  });

  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
  });

  app.get("/items", (req, res) => {
    storeService.getAllItems()
      .then(data => res.json(data))
      .catch(err => res.status(404).json({ message: err }));
  });
  
  app.get("/shop", (req, res) => {
    storeService.getPublishedItems()
      .then(data => res.json(data))
      .catch(err => res.status(404).json({ message: err }));
  });
  
  app.get("/categories", (req, res) => {
    storeService.getCategories()
      .then(data => res.json(data))
      .catch(err => res.status(404).json({ message: err }));
  });
  app.use((req, res) => {
    res.status(404).send("404 error bruh! Page Not Found");
  });
  storeService.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Express http server listening on port ${HTTP_PORT}`);
    });
  })
  .catch(err => {
    console.error(`Failed to initialize data: ${err}`);
  });