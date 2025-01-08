"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
//* ROUTERS:

// const router = express.Router()
const router = require('express').Router()

const Todo = require('../models/todo.model')

//? https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

// LIST TODOS:
router.get('/', async (req, res) => {

    // const data = await Todo.findAll()
    // const data = await Todo.findAll({
    //     attributes: ['title', 'description', 'priority'], // Select Fields
    //     where: { priority: -1 } // Filters
    // })
    const data = await Todo.findAndCountAll()

    res.status(200).send({
        error: false,
        result: data
    })

})

//? CRUD -> 

// CREATE TODO:
router.post('/', async (req, res) => {
    
    // const receivedData = req.body
    // console.log(receivedData)

    // const data = await Todo.create({
    //     title: receivedData.title,
    //     description: receivedData.description,
    //     priority: receivedData.priority,
    //     isDone: receivedData.isDone
    // })
    const data = await Todo.create(req.body)

    res.status(201).send({
        error: false,
        result: data
    })
    
})

// READ TODO:
router.get('/:id(\\d+)', async (req, res) => {

    // console.log(req.params.id)

    // const data = await Todo.findOne({ where: { id: req.params.id } })
    const data = await Todo.findByPk(req.params.id)

    res.status(200).send({
        error: false,
        result: data
    })

})


// UPDATE TODO:
router.put('/:id', async (req, res) => {

    // const data = await Todo.update({ ...newData }, { ...where })
    const data = await Todo.update(req.body, { where: { id: req.params.id }})
    // upsert: kayıt varsa güncelle, yoksa ekle

    // res.status(202).send({
    //     error: false,
    //     result: data, // kaç adet güncellendi bilgisi döner.
    //     message: 'Updated',
    //     new: await Todo.findByPk(req.params.id)
    // })

    res.status(202).send({
        error: false,
        result: await Todo.findByPk(req.params.id),
        message: 'Updated',
        count: data
    })    

})


// DELETE TODO:
router.delete('/:id', async (req, res) => {

    // const data = await Todo.destroy({ ...where })
    const data = await Todo.destroy({ where: { id: req.params.id } })

    // 204: No Content -> İçerik vermeyebilir.
    // res.status(204).send({
    //     error: false,
    //     message: 'Deleted',
    //     count: data
    // })

    if (data > 0) { // kayıt silindiyse...
        
        res.sendStatus(204)

    } else { // silinemediyse...

        // res.status(404).send({
        //     error: true,
        //     message: 'Can not Deleted. (Maybe Already deleted)'
        // })

        // send to ErrorHandler:
        res.errorStatusCode = 404
        throw new Error('Can not Deleted. (Maybe Already deleted)')

    }

})

module.exports = router

/* ------------------------------------------------------- */