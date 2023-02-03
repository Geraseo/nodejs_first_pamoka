//sukuriu savo serveri
const express = require("express");
const app = express();

//duomenys bus gaunami, perduodami json formatu
app.use(express.json());

//sukuriu masyva, kuris bus duomenu baze
const products = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, ribbed cuffs.",
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    description:
      "Great for any time, casual or dress,perfect for Spring/Autumn and Winter, Good for working, Daily wear...",
  },
];
//--------------------------------------------------------

//Svarbu 1. sukurti route'a
//VISI PRODUKTAI
app.get("/api/products", (req, res) => {
  res.send(products);
});

//konkrecios prekes paieska
//req yra prekes id
app.get("/api/products/:id", (req, res) => {
  const my_product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  //jei nerandam prekes, grazinam klaida
  if (!my_product) {
    res.status(404).send("The product with the given ID was not found.");
    return;
  } else {
    res.send(my_product);
  }
});
//--------------------------------------------------------

//naujos prekes pridejimas
app.post("/api/products", (req, res) => {
  const product = {
    id: products.length + 1,
    title: req.body.title,
  };
  products.push(product);
  res.send(product);
});
//--------------------------------------------------------

//prekes paupdatinimas
app.put("/api/products/:id", (req, res) => {
  const my_product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!my_product) {
    res.status(404).send("The product with the given ID was not found.");
    return;
  } else {
    my_product.title = req.body.title;
    res.send(my_product);
  }
});
//--------------------------------------------------------

//prekes istrinimas
app.delete("/api/products/:id", (req, res) => {
  const my_product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!my_product) {
    res.status(404).send("The product with the given ID was not found.");
    return;
  } else {
    const index = products.indexOf(my_product);
    products.splice(index, 1);
    res.send(my_product);
  }
});

//po cia runnins serveris ir daugiau nerasyti
//apsirasome porta, kuriame bus paleistas serveris
const port = 3001;

//svarbu 2. tik tada kai sukurtas, egzistuojantis route'as, paleidziame serveri
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
