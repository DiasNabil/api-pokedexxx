import express from 'express'
import morgan from 'morgan'
import favicon from 'serve-favicon'  
import bodyParser from 'body-parser'
import { sequelize, initDb } from './src/db/sequelize.js'
import findAllPokemons from './src/routes/findAllPokemons.js'
import findPokemonByPk from './src/routes/findPokemonByPk.js'
import createPokemon from './src/routes/createPokemon.js'
import updatePokemon from './src/routes/updatePokemon.js'
import deletePokemon from './src/routes/deletePokemon.js'

const app = express()
const port = 3000


/** middleware: fonction appliquer a chaque requete et reponse entre le client et l'api.
 * création d'une fonction  qui log l'url des requetes entrant vers l'api :
app.use((req,res,next) => {
    console.log(`URL: ${req.url}`)
    next()
})*/

/** package 'morgan': middleware express servant a logger les requete entrant
 * option dev: optimisation des msg logger
 * 
 * favicon: utilisation du middleware favicon pour ajouter une favicon a chaque reponse 
 * 
 * bodyParser: permet de convertir en json le corps de toute les requetes entrante
*/
app
//.use(favicon(__dirname+'/favicon.ico/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())

initDb()

findAllPokemons(app)
findPokemonByPk(app)
createPokemon(app)
updatePokemon(app)
deletePokemon(app)

app.listen(port, ()=> console.log(`listen on port:${port}`))
