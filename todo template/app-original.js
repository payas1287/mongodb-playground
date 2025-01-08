"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- *
$ npm init -y
$ npm i express dotenv express-async-errors
$ echo PORT=8000 > .env
$ npm i sequelize sqlite3
/* ------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept JSON data and convert to object (for API):
app.use(express.json())
// Accept FORM data and convert to object (for Template):
app.use(express.urlencoded({ extended: true }))

// express-async-errors: catch async-errors and send to errorHandler:
require('express-async-errors')

// app.all('/', (req, res) => {
//     res.send('WELCOME TO TODO API')
// })

/* ------------------------------------------------------- */
//* SEQUELIZE
// npm i sequelize sqlite3

const { Sequelize, DataTypes } = require('sequelize')

// DB Connection Settings:
// const sequelize = new Sequelize('sqlite:./db.sqlite3')
// const sequelize = new Sequelize('sqlite:' + process.env.SQLITE)
const sequelize = new Sequelize('sqlite:' + (process.env.SQLITE || './db.sqlite3'))

// Model:
// Her model, veritabanında bir tabloya karşılık gelir.
// sequelize.define('tableName', { tableDetails })

// Model isimleri PascalCase:
const Todo = sequelize.define('todos', {

    // sequelize'da id tanımlamaya gerek yoktur. Otomatik tanımlanır.
    // id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false, // default: true
    //     unique: true, // default: false
    //     comment: 'description',
    //     primaryKey: true, // default: false
    //     autoIncrement: true, // default: false
    //     field: 'custom_name', 
    //     defaultValue: 0 // default: null
    // },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // description: {
    //     type: DataTypes.TEXT,
    // },
    description: DataTypes.TEXT, // ShortHand 

    priority: { // -1: Low, 0: Normal, 1: Yüksek
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    // createdAt: {},
    // updatedAt: {},
    // createdAt ve updatedAt tanımlamaya gerek yoktur. Sequelize otomatik yönetir.

})

//* Syncronization:
//? Model'i veritabanına uygula:
// sequelize.sync() // CREATE TABLE (ilk uygulama)
// sequelize.sync({ force: true }) // DROP TABLE & CREATE TABLE (Dikkat! Data var ise silinir.)
// sequelize.sync({ alter: true }) // TO BACKUP & DROP TABLE & CREATE TABLE & FROM BACKUP 
//! sync() methodu 1 kere uygulanır ((modelde değişiklik var ise tekrar uygulanır.)

// Connect to DB:
sequelize.authenticate()
    .then(() => console.log('* DB Connected * '))
    .catch(() => console.log('* DB Not Connected * '))

/* ------------------------------------------------------- */
// ROUTERS:

const router = express.Router()

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

app.use(router)

/* ------------------------------------------------------- */
const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500
    console.log('errorHandler worked.')
    res.status(errorStatusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details
    })
}
app.use(errorHandler)
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));