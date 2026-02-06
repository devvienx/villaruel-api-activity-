const express = require('express')
const  router = express.Router();
const data = require('../models/disModel');

router.get('/dishes', (req, re) => {
    const { id, price, name, category, isVegetarian } =req.query;

    let filteredDishes = data
    .filter(
        (dish) =>
            !id || dish.id.toLowerCase() === id.toLowerCase(),
    )
    .filter((dish) => !price || dish.name <= parseFloat(price))
    .filter(
        (dish) => !name || dish.name.toLowerCase().includes(name.toLocaleLowerCase()),
    )
    .filter(
        (dish) =>
            !category || dish.category.toLocaleLowerCase() === category.toLocaleLowerCase())
    .filter(
        (dish) =>
            isVegetarian === undefined ||
        dish.isVegetarian === (isVegetarian === 'true')
    );
    return filteredDishes.length === 0
    ? res.status(404).json({
        status: 404,
        message: 'No dishes found matching the criteria',
    })
    : res.status(200).json({
        status: 200, 
        message: 'Retrieved dishes successfully',
        data: filteredDishes,
    });
});
    
router.post ('/dishes', (req, res) => {
    const { id, name, price, category, isVegetarian } = req.body || {};
    if (!id || !name || !price || !category || isVegetarian === undefined) {
        return res.status(400).json({
            status: 400,
            message: 'Bad Request: id, name, price, category and isVegetarian are required',
        });
    }
    const newItem = { id: data.length + 1, name, price, category, isVegetarian };
    data.push(newItem);
    res.status(201).json({
        status: 201,
        message: 'Dish created successfully',
        data: newItem,
    });
}
);

router.put('/dishes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((dish) => dish.id === id);
    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message : `Dish with ID ${id} not found`,
        });
    }
    data[index] = { ...data[index], ...req.body };
    return res.status(200).json({
        status: 200,
        message: 'Dish updated successfully',
        data: data[index],
    });
});

router.delete('/dishes/:id', (req, res) => {
    const id = parseInt (req.params.id);
    const index = data.findIndex((dish) => dish.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: `Dish with ID ${id} not found`,
        });
    }
    data.splice(index, 1);
    return res.status(200).json({
        status: 200,
        message: 'Dish deleted successfully',
    });
});

module.exports = router;
