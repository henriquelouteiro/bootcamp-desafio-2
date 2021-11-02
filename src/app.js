const express = require("express");
const cors = require("cors");
const {uuid, isUuid} = require('uuidv4')
const app = express();

app.use(express.json());
app.use(cors());

const repositories = [
  { id: uuid(), 
    title: "Desafio Node.js", 
    url : 'https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs',
    techs: ["Node.js", "..."], 
    likes: 0
  }
 
];

function addLike(id){
    let repositoriesIndex = searchIndex(id)

    if(repositoriesIndex<0) return 0
    repositories[repositoriesIndex].likes++
    return 1
}

function searchIndex(id){
  return (repositories.findIndex( repositorie => repositorie.id === id)
  )
}

app.get("/repositories", (req, response) => {
  response.json(repositories);
});

app.post("/repositories", (req, response) => {
  let {title,url,techs} = req.body
  let repositorie = {id: uuid(), title,url, techs, likes: 0}
  repositories.push(repositorie)
  return response.json(repositorie)
});

app.put("/repositories/:id", (req, response) => {
  let {id} = req.params
  let {title,url,techs} = req.body
  let repositoriesIndex = searchIndex(id)

  if(repositoriesIndex<0) return response.status(400).send()

  let {likes}  = repositories[repositoriesIndex]
  let repositorie = {id,title,url,techs,likes}
  repositories[repositoriesIndex]= repositorie
  return response.json(repositories[repositoriesIndex])
});

app.delete("/repositories/:id", (req, response) => {
  let {id} = req.params
  let repositoriesIndex = searchIndex(id)

  if(repositoriesIndex<0) return response.status(400).send()
  repositories.splice(repositoriesIndex,1)
  return response.status(204).send()
});

app.post("/repositories/:id/like", (req, response) => {
  let {id} = req.params
  if(addLike(id) === 1) return response.status(204).send()

  return response.status(400).send()

});

module.exports = app;
