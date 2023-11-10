import express from "express";
import bodyParser from "body-parser";
import { QUOTES } from "./quotes.js";

import assert from "node:assert";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: false,
  }),
);
app.use(bodyParser.json({ limit: "200mb" }));

app.use(function(req, res, next){
    req.setTimeout(500000, function(){
    });
    next();
});

app.use((err, req, res, next) => {
  console.error("An error occurred:", err);
  res.status(500).json({ error: "An internal server error occurred." });
});

app.get("/quotes/:id?", async (req, res) => {
  try {

    if (req.params.id) {
      const id = Number(req.params.id)
      assert.equal(id >= 0 && id <= QUOTES.length, true) 
        res.json(QUOTES[id]);
        return;
    }
    res.json(QUOTES)
  } catch(error) {
    console.log(error)
  }
})

app.delete('/del/:index', (req, res) => {
  const index = Number(req.params.index);

  if (index >= 0 && index < quotes.length) {
    quotes.splice(index, 1);
    res.send(`Deleted quote at index ${index}`);
  } else {
    res.status(404).send(`Quote at index ${index} not found`);
  }
});

app.put('/add/:index', (req, res) => {
  const newQuote = req.body;

  if (Array.isArray(newQuote) && newQuote.length === 2) {
    QUOTES.push(newQuote);
    res.send(`Quotes updated successfully`);
  } else {
    res.status(400).send('Invalid quote format');
  }
});

app.listen(port, () => console.log("Server started"));