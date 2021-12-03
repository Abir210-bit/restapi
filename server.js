const express = require('express');
const app = express();
const user = require('./user')
const connexion = require('./Connexion')
const port = process.env.PORT || 3000;


app.get('/getalluser',

    (req, res) => {

        try {
            const users = user.find()
            if (!users.length) {
                return res.json({ msg: 'error' })
            }
            res.json(users)

        } catch (err) { console.error(err) }

    })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})