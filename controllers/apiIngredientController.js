const mongoose = require('mongoose');
const Ingredient = require('../models/Ingredient');

exports.getIngredientsApi = (req, res) => {
  Ingredient.find()
    .then(ingredients => {
      res.json(ingredients);
    });
};

exports.postIngredientsApi = (req, res) => {
  const name = req.query.name;
  let ingredient = new Ingredient();
  ingredient.name = name;
  ingredient.save()
  .then(() => {
    res.redirect('/api');
  });
};

exports.editIngredientsApi = (req, res) => {
  Ingredient.findOne({ _id: req.params.id })
  .then(ingredient => {
    res.json(ingredient);
  });
};

exports.updateIngredientsApi = (req, res) => {
  Ingredient.findOneAndUpdate({ _id: req.params.id }, req.query, {
    new: true, // returns new ingredient
  })
  .then(ingredient => {
    res.redirect(`/api/ingredients/${req.params.id}`);
  });
};

exports.deleteIngredientsApi = (req, res) => {
  Ingredient.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.redirect('/api');
    });
};
