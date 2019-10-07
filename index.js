
const express = require('express')
const pgp = require('pg-promise')();
const db = pgp("postgres://postgres:password@localhost:5432/test");

const app = express()
app.use(express.json())
const port = 3000

app.get('/dragons', (req, res) => {
  return db.manyOrNone("select * from dragons.dragons").then(dragons => res.send(dragons))
});

app.post('/dragons', (req, res) => {
  console.log(req.body)
  return db.none('insert into dragons.dragons (name, color) values (${name}, ${color})', req.body).then(() => res.send()).catch(err => res.send(err))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))