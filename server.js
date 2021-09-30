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

app.get('/users', (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page -1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < users.length) {
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

    results.results = users.slice(startIndex, endIndex)

    res.json(results)

}) 

app.listen(3000)
