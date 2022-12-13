import express from 'express'
import morgan from 'morgan'
import favicon from 'serve-favicon'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import pokemons from './mock-pokemon.js'
import {success , getUniqueId}  from './helper.js'
import bodyParser from 'body-parser'
import { Sequelize } from 'sequelize';

const app = express()
const port = 3000

/**
 * Sequelize: ORM qui permet d'interagir avec une base de donnée directement en JS, cad qu'il s'ocp de faire la traduction des instructions en JS vers du SQL pour la BD
 * instance sequilize qui permet la connection a la base de donnée 
 */
const sequelize = new Sequelize(
    
    /**le nom de la db qu'on veut crée */
    'pokedexxx',

    /** id permettant l'acces a la db par defaute = root */
    'root',

    /**mdp permettant l'acces a la db par defaut '' */
    '',

    /** objet de configuration 
     * element obligatoire:
     * host: ou se trouve la db sur le pc
     * dialect: nom du driver utiliser permettant a sequelize de d'interagir avec la db
     */
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)

/** methode authenticate permet la connexion  la db  */
sequelize.authenticate()
    .then(_=> console.log('connecté a la base de donnée'))
    .catch(error => console.error('impossible de se connecter a la db: ' + error ))



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
.use(favicon(__dirname+'/favicon.ico/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())

   

app.get('/', (req,res)=> {
    res.send('Yoooo')
})

app.get('/api/pokemons', (req,res)=> {
    const msg = 'liste du pokedex: '
    res.json(success(msg,pokemons))
})

app.get('/api/pokemons/:id', (req,res)=> {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const msg = 'un pokemon sauvage apparait !'
    res.json(success(msg, pokemon))
})

/**
 * permet d'ajouter un nvx pokemon au pokedexxx grace a la requete POST
 */

app.post('/api/pokemons', (req,res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = {... req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `le pokemon ${pokemonCreated.name} à été ajouté au pokedexxx`
    res.json(success(message, pokemonCreated))
})

/** 
 * pour mettre a jour un des pokemon du pokedexx on peut utiliser la requete PATCH mais PUT est plus fiable
 */

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = pokemons.indexOf(pokemons.find(pokemon => pokemon.id ===id))
    const pokemonUpdated = { ...req.body, id: id }

    pokemonUpdated.created = pokemons[index].created
    pokemons.splice(index, 1, pokemonUpdated)
     
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
   })

   app.delete('/api/pokemons/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    const index = pokemons.indexOf(pokemonDeleted)
    
    pokemons.splice(index, 1)
    
    const message = `le pokemon ${pokemonDeleted.name} a bien été supprimé`
    res.json(success(message, pokemonDeleted))
   })


app.listen(port, ()=> console.log(`listen on port:${port}`))
