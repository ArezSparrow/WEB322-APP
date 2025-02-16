const fs = require("fs").promises;

let items = [];
let categories = [];

function initialize() {
  return new Promise((resolve, reject) => {
    Promise.all([
      fs.readFile("./data/item.json", "utf8"),
      fs.readFile("./data/categories.json", "utf8")
    ])
      .then(([itemsData, categoriesData]) => {
        items = JSON.parse(itemsData);
        categories = JSON.parse(categoriesData);
        resolve();
      })
      .catch(() => reject("Unable to read data files"));
  });
}

function getAllItems() {
  return new Promise((resolve, reject) => {
    if (items.length > 0) resolve(items);
    else reject("No items found");
  });
}

function getPublishedItems() {
  return new Promise((resolve, reject) => {
    const publishedItems = items.filter(item => item.published);
    if (publishedItems.length > 0) resolve(publishedItems);
    else reject("No published items found");
  });
}

function getCategories() {
  return new Promise((resolve, reject) => {
    if (categories.length > 0) resolve(categories);
    else reject("No categories found");
  });
}

module.exports = { initialize, getAllItems, getPublishedItems, getCategories };
