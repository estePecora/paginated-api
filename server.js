const express = require('express')
const app = express()

const users = [
    { id: 1, userName: 'user001'},
    { id: 2, userName: 'user002'},
    { id: 3, userName: 'user003'},
    { id: 4, userName: 'user004'},
    { id: 5, userName: 'user005'},
    { id: 6, userName: 'user006'},
    { id: 7, userName: 'user007'},
    { id: 8, userName: 'user008'},
]

const posts = [
    { id: 1, post: 'post 001'},
    { id: 2, post: 'post 002'},
    { id: 3, post: 'post 003'},
    { id: 4, post: 'post 004'},
    { id: 5, post: 'post 005'},
    { id: 6, post: 'post 006'},
    { id: 7, post: 'post 007'},
    { id: 8, post: 'post 008'},
]

app.get('/users', paginatedResults(users), (req, res) => {
    res.json(res.paginatedResults)

}) 

app.get('/posts', paginatedResults(posts), (req, res) => {
    res.json(res.paginatedResults)

}) 

function paginatedResults(model) {
    return (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page -1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < model.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0){
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        results.results = model.slice(startIndex, endIndex)

        res.paginatedResults = results
        next()

    }
}

app.listen(3000)
